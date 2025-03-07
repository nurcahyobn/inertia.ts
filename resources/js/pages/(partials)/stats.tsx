import { IconChartTrending, IconChartTrendingDown } from "justd-icons"
import { Badge, Card, type ChartConfig } from "ui"
import { salesAnalytics } from "./data"

export function Stats({ config }: { config: ChartConfig }) {
  const calculateAverageAndChange = (data: any[], key: string) => {
    const values = data.map((item) => item[key])
    const average = values.reduce((sum, value) => sum + value, 0) / values.length

    const firstValue = values[0]
    const lastValue = values[values.length - 1]
    const change = ((lastValue - firstValue) / firstValue) * 100

    return { average, change }
  }

  const salesAnalyticsData = salesAnalytics
  const configKeys = Object.keys(config)
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
      {configKeys.map((key) => {
        const { average, change } = calculateAverageAndChange(salesAnalyticsData, key)
        const up = change >= 0
        const changeSign = up ? "+" : ""
        const Icon = up ? IconChartTrending : IconChartTrendingDown

        return (
          <Card key={key}>
            <Card.Header className="relative pr-4">
              <Badge
                className="absolute right-2 bottom-4 sm:top-2 sm:bottom-auto"
                intent={up ? "success" : "danger"}
              >
                <Icon /> {changeSign}
                {Math.round(change)}%
              </Badge>
              <Card.Description>{config[key].label}</Card.Description>
              <Card.Title>{Math.round(average).toLocaleString()}</Card.Title>
            </Card.Header>
          </Card>
        )
      })}
    </div>
  )
}
