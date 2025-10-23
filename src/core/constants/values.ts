import { BarChart2, Calendar, Inbox } from 'lucide-react'
import { ROUTES } from './routes'

export type MiniChartType = {
  type: string
  text: string
  icon: string
}
export const miniChartData: MiniChartType[] = [
  {
    text: 'Нийт мерчантын тоо',
    type: 'count',
    icon: '/book-check.png',
  },
  {
    text: 'Энэ сард бүртгэсэн',
    type: 'monthly_count',
    icon: '/book-check.png',
  },
  {
    text: 'Сүүлийн долоо хоногт бүртгэсэн',
    type: 'weekly_count',
    icon: '/book-check.png',
  },
]

export const initialPageValues = {
  page: 1,
  limit: 20,
  reload: false,
  search: undefined,
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm'

// Menu items.
export const MENU_ITEMS = [
  {
    title: 'Дашбоард',
    url: ROUTES.protected.home,
    icon: BarChart2,
  },
  {
    title: 'Mерчант',
    url: ROUTES.protected.merchant,
    icon: Inbox,
  },
  {
    title: 'Карт',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Картын гүйлгээ',
        url: ROUTES.protected.cardTransaction,
        isActive: false,
      },
      {
        title: 'Картын тайлан',
        url: ROUTES.protected.cardReport,
        isActive: false,
      },
    ],
  },
  {
    title: 'Данс',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Дансны гүйлгээ',
        url: ROUTES.protected.p2pTransaction,
        isActive: false,
      },
      {
        title: 'Дансны тайлан',
        url: ROUTES.protected.p2pReport,
        isActive: false,
      },
    ],
  },
]
