import orders from "@/data/orders.json"
import { twJoin } from "tailwind-merge"
import { Card } from "ui"

const statusCounts = orders.reduce<Record<string, number>>((acc, { status }) => {
  acc[status] = (acc[status] || 0) + 1
  return acc
}, {})
export function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Object.entries(statusCounts).map(([status, count]) => (
        <Card key={status}>
          <Card.Header className="relative">
            <div
              aria-hidden
              className={twJoin(
                "-translate-y-1/2 absolute top-1/2 left-0 h-10 w-0.5 rounded-full",
                status === "delivered"
                  ? "bg-success"
                  : status === "shipped"
                    ? "bg-primary"
                    : status === "pending"
                      ? "bg-warning"
                      : "bg-danger",
              )}
            />
            <Card.Title>{count}</Card.Title>
            <Card.Description className="capitalize">{status}</Card.Description>
          </Card.Header>
        </Card>
      ))}
    </div>
  )
}
