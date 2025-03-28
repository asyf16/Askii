"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartData {
  category: string;
  questions: number;
  fill: string;
}

const chartConfig = {
  good: {
    label: "good",
  },
  mediocre: {
    label: "mid",
  },
  bad: {
    label: "bad",
  },
} satisfies ChartConfig

export function PieChartComponent({chartData, label, description}: {chartData: ChartData[], label: string, description: string}) {

  const nonOther = React.useMemo(() => {
    return chartData
      .filter(item => item.category !== "Other") 
      .reduce((acc, curr) => acc + curr.questions, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col border shadow-md m-0 p-0 hover:bg-muted-foreground/10 transition-all duration-300">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="questions"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold font-montserrat"
                        >
                          {nonOther.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground font-bold font-montserrat"
                        >
                          Questions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-bold text-accent-foreground leading-none font-montserrat">
          {label}
        </div>
        <div className="leading-none text-muted-foreground font-montserrat">
          {description}
        </div>
      </CardFooter>
    </Card>
  )
}
