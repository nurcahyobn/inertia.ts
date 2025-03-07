
import { useState } from "react"
import type { Key } from "react-aria-components"
import { BarChart, Card, type ChartConfig, Select } from "ui"
import { ranges, salesAnalytics } from "./data"

export function SaleAnalytics({ config }: { config: ChartConfig }) {
  const [selectedRange, setSelectedRange] = useState<Key>(30)
  const [selectedKey, setSelectedKey] = useState<Key>("totalSales")
  const filteredSaleAnalytics = salesAnalytics.slice(0, Number(selectedRange))

  const selectedRangeLabel =
    ranges.find((range) => range.key === selectedRange)?.label.toLowerCase() || ""

  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <Card.Header
          className="p-0"
          title="SaleAnalytics"
          description={`Monthly salesAnalytics metrics for the ${selectedRangeLabel}.`}
        />
        <div className="grid max-w-xl grid-cols-2 gap-2">
          <Select
            selectedKey={selectedRange}
            onSelectionChange={setSelectedRange}
            aria-label="Select range"
            placeholder="Select a range"
          >
            <Select.Trigger />
            <Select.List>
              {ranges.map((range) => (
                <Select.Option key={range.key} id={range.key}>
                  {range.label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
          <Select
            selectedKey={selectedKey}
            onSelectionChange={setSelectedKey}
            aria-label="Metrics"
            placeholder="Select a metric"
          >
            <Select.Trigger />
            <Select.List>
              {Object.entries(config).map(([key, { label }]) => (
                <Select.Option key={key} id={key}>
                  {label}
                </Select.Option>
              ))}
            </Select.List>
          </Select>
        </div>
      </div>

      <Card.Content>
        <BarChart
          hideYAxis
          legend={false}
          className="h-64 md:h-96"
          config={{ [selectedKey]: config[selectedKey as keyof typeof config] }}
          data={filteredSaleAnalytics}
          dataKey="day"
        />
      </Card.Content>
    </Card>
  )
}
