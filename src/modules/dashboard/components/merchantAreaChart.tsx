'use client'
import React, { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { Card } from '@/components/ui/card'
import { DashboardType } from '../types/types'

interface Props {
  data: DashboardType
}
const MerchantAreaChart = ({ data }: Props) => {
  const [series, setSeries] = useState([
    {
      name: '',
      data: [] as number[],
    },
  ])

  const options = {
    title: {
      text: 'Мерчант элсүүлэлтийн тоо',
      align: 'center',
    },
    fontSize: '14px',
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    labels: [
      '1-р сар',
      '2-р сар',
      '3 сар',
      '4-р сар',
      '5-р сар',
      '6-р сар',
      '7-р сар',
      '8-р сар',
      '9-р сар',
      '10-р сар',
      '11-р сар',
      '12-р сар',
    ],
    legend: {
      horizontalAlign: 'left',
    },
  }
  useEffect(() => {
    setSeries([
      {
        name: 'Элсүүлэлтийн тоо',
        data: data.monthly.activated,
      },
    ])
  }, [data])

  return (
    <Card>
      <ApexChart
        type="area"
        options={options as any}
        series={series}
        height={500}
      />
    </Card>
  )
}

export default MerchantAreaChart
