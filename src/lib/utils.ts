import { BusinessDirection, CardTransactionType, IMCC, City, District } from '@/modules/general/types/type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numberWithCommas = (num: number | string) => {
  // 20000 --> 20,000
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getStaticArray = (num: number): number[] =>
  Array.from({ length: num }, (_, i) => i)

export const getMonthlyNameList = (): string[] => {
  const array: number[] = getStaticArray(12)
  return array.map((_: any, index: number) => `${index + 1}-р сар`)
}

export const getWeeklyNameList = (): string[] => [
  'даваа',
  'мягмар',
  'лхагва',
  'пүрэв',
  'баасан',
  'бямба',
  'ням',
]

export const getTodayNameList = (): string[] => [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

export const getMCC = (value: string) => {
  let mccs
  if (typeof window !== 'undefined') {
    const vendorStore = sessionStorage.getItem('vendor-store')
    if (vendorStore) {
      try {
        const parsedStore = JSON.parse(vendorStore)
        mccs = parsedStore?.state?.generalData?.mccs || []
      } catch (error) {
        console.error('Error parsing vendor-store:', error)
        mccs = []
      }
    } else {
      mccs = []
    }
  }

  const mccName = mccs?.find((mcc: IMCC) => mcc.mcc_code === value)?.name_mon
  return mccName
}

export const getBusinessDirection = (value: string) => {
  let business_directions
  if (typeof window !== 'undefined') {
    const vendorStore = sessionStorage.getItem('vendor-store')
    if (vendorStore) {
      try {
        const parsedStore = JSON.parse(vendorStore)
        business_directions =
          parsedStore?.state?.generalData?.business_directions || []
      } catch (error) {
        console.error('Error parsing vendor-store:', error)
        business_directions = []
      }
    } else {
      business_directions = []
    }
  }

  const mccName = business_directions?.find(
    (b_direction: BusinessDirection) => b_direction.id === value,
  )?.name
  return mccName
}

export const getCityName = (value: string) => {
  let CITY_ARRAY
  if (typeof window !== 'undefined') {
    const vendorStore = sessionStorage.getItem('vendor-store')
    if (vendorStore) {
      try {
        const parsedStore = JSON.parse(vendorStore)
        CITY_ARRAY =
          parsedStore?.state?.generalData?.cities || []
      } catch (error) {
        console.error('Error parsing vendor-store:', error)
        CITY_ARRAY = []
      }
    } else {
      CITY_ARRAY = []
    }
  }

  const cityName = CITY_ARRAY?.find(
    (city: City) => city.code === value,
  )?.name
  return cityName
}

export const getDistrictName = (value: string) => {
  let DISTRICT_ARRAY
  if (typeof window !== 'undefined') {
    const vendorStore = sessionStorage.getItem('vendor-store')
    if (vendorStore) {
      try {
        const parsedStore = JSON.parse(vendorStore)
        DISTRICT_ARRAY =
          parsedStore?.state?.generalData?.districts || []
      } catch (error) {
        console.error('Error parsing vendor-store:', error)
        DISTRICT_ARRAY = []
      }
    } else {
      DISTRICT_ARRAY = []
    }
  }

  const districtName = DISTRICT_ARRAY?.find(
    (district: District) => district.code === value,
  )?.name
  return districtName
}

export const getCardTransactionType = (value: string) => {
  let CARD_TRANSACTION_TYPE
  if (typeof window !== 'undefined') {
    const vendorStore = sessionStorage.getItem('vendor-store')
    if (vendorStore) {
      try {
        const parsedStore = JSON.parse(vendorStore)
        CARD_TRANSACTION_TYPE =
          parsedStore?.state?.generalData?.CARD_TRANSACTION_TYPE || []
      } catch (error) {
        console.error('Error parsing vendor-store:', error)
        CARD_TRANSACTION_TYPE = []
      }
    } else {
      CARD_TRANSACTION_TYPE = []
    }
  }

  const card_type = CARD_TRANSACTION_TYPE?.find(
    (type: CardTransactionType) => type.code === value,
  )

  return card_type
}

export const convertBankName = (name: string) => {
  type ObjectType = {
    [key: string]: string
  }
  const names: ObjectType = {
    'Богд банк': 'BOGDBANK',
    'Голомт банк': 'GOLOMTBANK',
    'Капитрон банк': 'CAPITRONBANK',
    'М банк': 'MBANK',
    'Тээвэр хөгжлийн банк': 'TRANSBANK',
    'Хаан банк': 'KHANBANK',
    'Хас банк': 'XACBANK',
    ХХБ: 'TDBANK',
    'Худалдаа хөгжлийн банк': 'TDBANK',
    'Төрийн банк': 'STATEBANK',
  }

  return names[name]
}
