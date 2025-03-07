import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListOrders } from "./(partials)/list-orders"

export default function Page() {
  return <ListOrders />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
