'use client'

import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getCardTransactionType } from '@/lib/utils'
import { IMerchantListQuery } from '@/modules/merchant/types/types'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type SelectOption = {
  value: string
  label: string
}

type Props = {
  onFilter: (value: { [key: string]: string | undefined }) => void
  query: IMerchantListQuery
  queryField: string
  placeholder: string
  options: SelectOption[]
  disabled?: boolean
}

export const CustomSelect = ({
  onFilter,
  query,
  queryField,
  placeholder,
  options,
  disabled = false,
}: Props) => {
  const [key, setKey] = useState(crypto.randomUUID())

  useEffect(() => {
    if (!query[queryField as keyof IMerchantListQuery]) {
      setKey(crypto.randomUUID())
    }
  }, [query])

  const value = query[queryField as keyof IMerchantListQuery] as string | undefined

  return (
    <Select
      key={key}
      value={value ?? ''}
      onValueChange={(val) => {
        if (!disabled) onFilter({ [queryField]: val })
      }}
      disabled={disabled}
    >
      <SelectTrigger
        disabled={disabled}
        className={cn(
          'w-[200px] text-muted-foreground',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      {!disabled && (
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              let cardType = undefined
              if (queryField === 'transaction_type') {
                cardType = getCardTransactionType(option.value)
              }

              return (
                <SelectItem key={option.value} value={option.value}>
                  {queryField === 'transaction_status' ? (
                    <Badge variant={option.value.toLowerCase() as any}>
                      {option.value === 'SUCCESS' ? 'Амжилттай' : 'Амжилтгүй'}
                    </Badge>
                  ) : queryField === 'transaction_type' ? (
                    <Badge variant={cardType?.code.toLowerCase() ?? 'default'}>
                      {cardType?.name}
                    </Badge>
                  ) : (
                    option.label
                  )}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  )
}
