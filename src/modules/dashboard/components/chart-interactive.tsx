"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", failed: 222, success: 150 },
  { date: "2024-04-02", failed: 97, success: 180 },
  { date: "2024-04-03", failed: 167, success: 120 },
  { date: "2024-04-04", failed: 242, success: 260 },
  { date: "2024-04-05", failed: 373, success: 290 },
  { date: "2024-04-06", failed: 301, success: 340 },
  { date: "2024-04-07", failed: 245, success: 180 },
  { date: "2024-04-08", failed: 409, success: 320 },
  { date: "2024-04-09", failed: 59, success: 110 },
  { date: "2024-04-10", failed: 261, success: 190 },
  { date: "2024-04-11", failed: 327, success: 350 },
  { date: "2024-04-12", failed: 292, success: 210 },
  { date: "2024-04-13", failed: 342, success: 380 },
  { date: "2024-04-14", failed: 137, success: 220 },
  { date: "2024-04-15", failed: 120, success: 170 },
  { date: "2024-04-16", failed: 138, success: 190 },
  { date: "2024-04-17", failed: 446, success: 360 },
  { date: "2024-04-18", failed: 364, success: 410 },
  { date: "2024-04-19", failed: 243, success: 180 },
  { date: "2024-04-20", failed: 89, success: 150 },
  { date: "2024-04-21", failed: 137, success: 200 },
  { date: "2024-04-22", failed: 224, success: 170 },
  { date: "2024-04-23", failed: 138, success: 230 },
  { date: "2024-04-24", failed: 387, success: 290 },
  { date: "2024-04-25", failed: 215, success: 250 },
  { date: "2024-04-26", failed: 75, success: 130 },
  { date: "2024-04-27", failed: 383, success: 420 },
  { date: "2024-04-28", failed: 122, success: 180 },
  { date: "2024-04-29", failed: 315, success: 240 },
  { date: "2024-04-30", failed: 454, success: 380 },
  { date: "2024-05-01", failed: 165, success: 220 },
  { date: "2024-05-02", failed: 293, success: 310 },
  { date: "2024-05-03", failed: 247, success: 190 },
  { date: "2024-05-04", failed: 385, success: 420 },
  { date: "2024-05-05", failed: 481, success: 390 },
  { date: "2024-05-06", failed: 498, success: 520 },
  { date: "2024-05-07", failed: 388, success: 300 },
  { date: "2024-05-08", failed: 149, success: 210 },
  { date: "2024-05-09", failed: 227, success: 180 },
  { date: "2024-05-10", failed: 293, success: 330 },
  { date: "2024-05-11", failed: 335, success: 270 },
  { date: "2024-05-12", failed: 197, success: 240 },
  { date: "2024-05-13", failed: 197, success: 160 },
  { date: "2024-05-14", failed: 448, success: 490 },
  { date: "2024-05-15", failed: 473, success: 380 },
  { date: "2024-05-16", failed: 338, success: 400 },
  { date: "2024-05-17", failed: 499, success: 420 },
  { date: "2024-05-18", failed: 315, success: 350 },
  { date: "2024-05-19", failed: 235, success: 180 },
  { date: "2024-05-20", failed: 177, success: 230 },
  { date: "2024-05-21", failed: 82, success: 140 },
  { date: "2024-05-22", failed: 81, success: 120 },
  { date: "2024-05-23", failed: 252, success: 290 },
  { date: "2024-05-24", failed: 294, success: 220 },
  { date: "2024-05-25", failed: 201, success: 250 },
  { date: "2024-05-26", failed: 213, success: 170 },
  { date: "2024-05-27", failed: 420, success: 460 },
  { date: "2024-05-28", failed: 233, success: 190 },
  { date: "2024-05-29", failed: 78, success: 130 },
  { date: "2024-05-30", failed: 340, success: 280 },
  { date: "2024-05-31", failed: 178, success: 230 },
  { date: "2024-06-01", failed: 178, success: 200 },
  { date: "2024-06-02", failed: 470, success: 410 },
  { date: "2024-06-03", failed: 103, success: 160 },
  { date: "2024-06-04", failed: 439, success: 380 },
  { date: "2024-06-05", failed: 88, success: 140 },
  { date: "2024-06-06", failed: 294, success: 250 },
  { date: "2024-06-07", failed: 323, success: 370 },
  { date: "2024-06-08", failed: 385, success: 320 },
  { date: "2024-06-09", failed: 438, success: 480 },
  { date: "2024-06-10", failed: 155, success: 200 },
  { date: "2024-06-11", failed: 92, success: 150 },
  { date: "2024-06-12", failed: 492, success: 420 },
  { date: "2024-06-13", failed: 81, success: 130 },
  { date: "2024-06-14", failed: 426, success: 380 },
  { date: "2024-06-15", failed: 307, success: 350 },
  { date: "2024-06-16", failed: 371, success: 310 },
  { date: "2024-06-17", failed: 475, success: 520 },
  { date: "2024-06-18", failed: 107, success: 170 },
  { date: "2024-06-19", failed: 341, success: 290 },
  { date: "2024-06-20", failed: 408, success: 450 },
  { date: "2024-06-21", failed: 169, success: 210 },
  { date: "2024-06-22", failed: 317, success: 270 },
  { date: "2024-06-23", failed: 480, success: 530 },
  { date: "2024-06-24", failed: 132, success: 180 },
  { date: "2024-06-25", failed: 141, success: 190 },
  { date: "2024-06-26", failed: 434, success: 380 },
  { date: "2024-06-27", failed: 448, success: 490 },
  { date: "2024-06-28", failed: 149, success: 200 },
  { date: "2024-06-29", failed: 103, success: 160 },
  { date: "2024-06-30", failed: 446, success: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  failed: {
    label: "Амжилтгүй",
    color: "var(--color-merchant)",
  },
  success: {
    label: "Амжилттай",
    color: "var(--color-transfer)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Дансны гүйлгээ</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Сүүлийн нэг жил
          </span>
          <span className="@[540px]/card:hidden">Сүүлийн 3 сар</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Сүүлийн 3 сар</ToggleGroupItem>
            <ToggleGroupItem value="30d">Сүүлийн 30 хоног</ToggleGroupItem>
            <ToggleGroupItem value="7d">Сүүлийн нэг 7 хоног</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Сүүлийн 3 сар" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Сүүлийн 3 сар
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Сүүлийн 30 хоног
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Сүүлийн нэг 7 хоног
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-merchant)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-merchant)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-transfer)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-transfer)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="failed"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-merchant)"
              stackId="a"
            />
            <Area
              dataKey="success"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-transfer)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
