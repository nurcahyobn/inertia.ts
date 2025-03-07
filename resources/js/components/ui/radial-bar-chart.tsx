"use client"

import { Cell, RadialBar, RadialBarChart as RadialBarChartPrimitive } from "recharts"

import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { cn } from "@/utils/classes"
import type { ComponentProps } from "react"
import {
  type BaseChartProps,
  Chart,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  DEFAULT_COLORS,
  getColorValue,
} from "./chart"

interface RadialBarChartProps<TValue extends ValueType, TName extends NameType>
  extends Omit<
    BaseChartProps<TValue, TName>,
    | "hideGridLines"
    | "hideXAxis"
    | "hideYAxis"
    | "xAxisProps"
    | "yAxisProps"
    | "displayEdgeLabelsOnly"
  > {
  variant?: "pie" | "donut"
  nameKey?: string

  hideLabel?: boolean

  barSize?: number

  chartProps?: Omit<ComponentProps<typeof RadialBarChartPrimitive>, "data" | "stackOffset">
}

const RadialBarChart = <TValue extends ValueType, TName extends NameType>({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  className,
  config,
  children,

  hideLabel,

  tooltip = true,
  tooltipProps,

  legend = true,
  legendProps,

  variant = "pie",
  nameKey,

  barSize = 10,

  chartProps,

  valueFormatter = (value: number) => value.toString(),

  ...props
}: RadialBarChartProps<TValue, TName>) => {
  return (
    <Chart
      className={cn(className)}
      config={config}
      data={data}
      layout="radial"
      dataKey={dataKey}
      {...props}
    >
      {({ onLegendSelect, selectedLegend }) => (
        <RadialBarChartPrimitive
          data={data}
          onClick={() => {
            onLegendSelect(null)
          }}
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={100}
          barSize={barSize}
          {...chartProps}
        >
          {children}
          <RadialBar
            label={{
              position: "insideStart",
              fill: "var(--fg)",
              style: {
                opacity: hideLabel ? 0 : 1,
              },
            }}
            dataKey={dataKey}
            background
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getColorValue(colors[index % colors.length])} />
            ))}
          </RadialBar>

          {legend && (
            <ChartLegend
              content={typeof legend === "boolean" ? undefined : legend}
              align="center"
              verticalAlign="bottom"
              {...legendProps}
            />
          )}

          {tooltip && (
            <ChartTooltip
              content={
                typeof tooltip === "boolean" ? <ChartTooltipContent accessibilityLayer /> : tooltip
              }
              {...tooltipProps}
            />
          )}
        </RadialBarChartPrimitive>
      )}
    </Chart>
  )
}

export type { RadialBarChartProps }
export { RadialBarChart }
