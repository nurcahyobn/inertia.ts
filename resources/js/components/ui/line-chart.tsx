"use client"

import { Line, LineChart as LineChartPrimitive } from "recharts"

import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

import { cn } from "@/utils/classes"
import type { ComponentProps } from "react"
import {
  type BaseChartProps,
  CartesianGrid,
  Chart,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  DEFAULT_COLORS,
  XAxis,
  YAxis,
  constructCategoryColors,
  getColorValue,
  valueToPercent,
} from "./chart"

interface LineChartProps<TValue extends ValueType, TName extends NameType>
  extends BaseChartProps<TValue, TName> {
  connectNulls?: boolean
  chartProps?: Omit<ComponentProps<typeof LineChartPrimitive>, "data" | "stackOffset">
}

export const LineChart = <TValue extends ValueType, TName extends NameType>({
  data = [],
  dataKey,
  colors = DEFAULT_COLORS,
  connectNulls = false,
  type = "default",
  className,
  config,
  children,

  // Components
  tooltip = true,
  tooltipProps,

  legend = true,
  legendProps,

  intervalType = "equidistantPreserveStart",

  valueFormatter = (value: number) => value.toString(),

  // XAxis
  displayEdgeLabelsOnly = false,
  xAxisProps,
  hideXAxis = false,

  // YAxis
  yAxisProps,
  hideYAxis = false,

  hideGridLines = false,
  chartProps,
  ...props
}: LineChartProps<TValue, TName>) => {
  const categoryColors = constructCategoryColors(Object.keys(config), colors)

  return (
    <Chart
      className={cn("h-80 w-full", className)}
      config={config}
      data={data}
      dataKey={dataKey}
      {...props}
    >
      {({ onLegendSelect, selectedLegend }) => (
        <LineChartPrimitive
          onClick={() => {
            onLegendSelect(null)
          }}
          data={data}
          margin={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 5,
          }}
          stackOffset={type === "percent" ? "expand" : undefined}
          {...chartProps}
        >
          {!hideGridLines && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            hide={hideXAxis}
            className="**:[text]:fill-muted-fg"
            displayEdgeLabelsOnly={displayEdgeLabelsOnly}
            intervalType={intervalType}
            {...xAxisProps}
          />
          <YAxis
            hide={hideYAxis}
            className="**:[text]:fill-muted-fg"
            tickFormatter={type === "percent" ? valueToPercent : valueFormatter}
            {...yAxisProps}
          />

          {legend && (
            <ChartLegend
              content={typeof legend === "boolean" ? <ChartLegendContent /> : legend}
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

          {Object.entries(config).map(([category, values]) => {
            const strokeOpacity = selectedLegend && selectedLegend !== category ? 0.1 : 1

            return (
              <Line
                key={category}
                dot={false}
                name={category}
                type="linear"
                dataKey={category}
                stroke={getColorValue(values.color || categoryColors.get(category))}
                style={{
                  strokeOpacity,
                  strokeWidth: 2,
                }}
                strokeLinejoin="round"
                strokeLinecap="round"
                connectNulls={connectNulls}
              />
            )
          })}
          {children}
        </LineChartPrimitive>
      )}
    </Chart>
  )
}
