'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { IMCC } from '@/modules/general/types/type'
import { IMerchantListQuery } from '@/modules/merchant/types/types'

type Props = {
  onFilter: (newValue: { [key: string]: string | undefined }) => void
  query: IMerchantListQuery
  data: IMCC[]
}

export function ComboBoxMCC({ onFilter, query, data }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [key, setKey] = React.useState(crypto.randomUUID())

  React.useEffect(() => {
    if (!query.mcc_code) {
      setValue('')
      setKey(crypto.randomUUID())
    }
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen} key={key}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between text-gray-500"
        >
          {query.mcc_code
            ? data.find((item) => item.mcc_code === query.mcc_code)?.name_mon
            : 'MCC хайх...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="MCC хайх..." />
          <CommandList>
            <CommandEmpty>MCC олдсонгүй.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.mcc_code}
                  value={item.name_mon}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                    onFilter({
                      mcc_code: currentValue === value ? '' : currentValue,
                    })
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.mcc_code ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.name_mon}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
