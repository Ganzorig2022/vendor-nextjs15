'use client'
import React from 'react'
import ApexChart from 'react-apexcharts'
import { numberWithCommas } from '@/lib/utils'
import { DashboardTransactions } from '../types/types'
import { Card } from '@/components/ui/card'

type Props = {
  series: DashboardTransactions[]
  titleText: string
}

const ApexBarChart = ({ series, titleText }: Props) => {
  const options = {
    title: {
      text: `${titleText} гүйлгээний мэдээлэл`,
      align: 'center',
      margin: 10,
      style: {
        fontSize: '20px',
        fontWeight: 700,
      },
    },
    colors: ['#4fd1c5', '#FF4d4f'],
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: true,
      strokeDashArray: [5],
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        formatter: function (value: number) {
          return value + '-р сар'
        },
      },
    },
    yaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        formatter: function (value: number) {
          return numberWithCommas(value) + ' ₮'
        },
      },
    },
    fill: {
      type: 'gradient',
      // gradient: {
      // 	shade: 'dark',
      // 	shadeIntensity: 0.1,
      // 	inverseColors: false,
      // 	opacityFrom: 0.8,
      // 	opacityTo: 0.5,
      // 	stops: [0, 50, 100,],
      // },
    },
    tooltip: {
      enabled: true,
    },
  }

  if (!series) return <div></div>

  return (
    <Card>
      <ApexChart
        type="area"
        options={options as any}
        series={series}
        height={350}
      />
    </Card>
  )
}

export default ApexBarChart

// const series = [
// 	{
// 		name: 'Амжилттай гүйлгээ',
// 		data: [
// 			{ x: '1-р сар', y: 15 },
// 			{ x: '2-р сар', y: 40 },
// 		],
// 	},
// 	{
// 		name: 'Амжилттай гүйлгээ',
// 		data: [
// 			{ x: '1-р сар', y: 15 },
// 			{ x: '2-р сар', y: 40 },
// 		],
// 	},
// ];
