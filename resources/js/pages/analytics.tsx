import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { Card } from "ui"
import { SaleAnalytics } from "./(partials)/sale-analytics"
import { Stats } from "./(partials)/stats"

const config = {
  totalSales: { label: "Total Sales", color: "var(--color-blue-500)" },
  newCustomers: { label: "New Customers", color: "var(--color-pink-500)" },
  revenue: { label: "Revenue", color: "var(--color-emerald-600)" },
  refunds: { label: "Refunds", color: "var(--color-blue-500)" },
  averageOrderValue: { label: "Average Order Value", color: "var(--color-blue-500)" },
  returningCustomers: { label: "Returning Customers", color: "var(--color-emerald-400)" },
}
export default function Page() {
  return (
    <>
      <Card.Header className="p-0">
        <Card.Title level={1}>Engagement</Card.Title>
        <Card.Description>
          Track your engagement and see how they compare to your competitors.
        </Card.Description>
      </Card.Header>
      <div className="flex flex-col gap-4">
        <Stats config={config} />
        <SaleAnalytics config={config} />
      </div>
    </>
  )
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
