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
  search: null,
}

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm'
