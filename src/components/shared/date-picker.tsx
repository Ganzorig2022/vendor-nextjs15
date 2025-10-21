'use client'

import { formatISO } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IMerchantListQuery } from '@/modules/merchant/types/types'

interface Props {
  placeholder: string
  onFilter: (value: { [key: string]: string | undefined }) => void
  query: IMerchantListQuery
  type: string
}

export function DatePicker({ placeholder, onFilter, query, type }: Props) {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    if (!query[type as keyof IMerchantListQuery]) {
      setDate(undefined)
    }
  }, [query])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {query[type as keyof IMerchantListQuery] ? (
            // @ts-ignore
            formatISO(query[type], { representation: 'date' })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date)
              onFilter({ [type]: formatISO(date) })
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
