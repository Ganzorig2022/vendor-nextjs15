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
}

export const CustomSelect = ({
  onFilter,
  query,
  queryField,
  placeholder,
  options,
}: Props) => {
  const [key, setKey] = useState(crypto.randomUUID())

  useEffect(() => {
    if (!query[queryField as keyof IMerchantListQuery]) {
      setKey(crypto.randomUUID())
    }
  }, [query])

  return (
    <Select
      key={key}
      // @ts-ignore
      value={query[queryField as keyof IMerchantListQuery]}
      onValueChange={(val) => {
        onFilter({ [queryField]: val })
      }}
    >
      <SelectTrigger className="w-[200px] text-muted-foreground">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => {
            let card_type
            if (queryField === 'transaction_type') {
              card_type = getCardTransactionType(option.value)
            }
            return (
              <SelectItem key={option.value} value={option.value}>
                {queryField === 'transaction_status' ? (
                  <Badge variant={option.value.toLowerCase() as any}>
                    {option.value === 'SUCCESS' ? 'Амжилттай' : 'Амжилтгүй'}
                  </Badge>
                ) : queryField === 'transaction_type' ? (
                  <Badge variant={card_type?.code.toLowerCase() ?? 'default'}>
                    {card_type?.name}
                  </Badge>
                ) : (
                  option.label
                )}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

