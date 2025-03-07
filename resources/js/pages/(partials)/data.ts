export const salesAnalytics = Array.from({ length: 365 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() - index)
  const day = date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
  return {
    day,
    totalSales: Math.floor(Math.random() * 500 + 50),
    newCustomers: Math.floor(Math.random() * 200 + 30),
    revenue: Math.floor(Math.random() * 10000 + 5000),
    refunds: Math.floor(Math.random() * 20 + 1),
    averageOrderValue: Math.floor(Math.random() * 200 + 50),
    returningCustomers: Math.floor(Math.random() * 100 + 10),
  }
})

export const ranges = [
  { key: 7, label: "Last Week" },
  { key: 15, label: "Last 2 Weeks" },
  { key: 30, label: "Last Month" },
  { key: 60, label: "Last 2 Months" },
  { key: 90, label: "Last 3 Months" },
  { key: 180, label: "Last 6 Months" },
  { key: 365, label: "Last Year" },
]
