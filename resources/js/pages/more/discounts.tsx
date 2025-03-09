import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListDiscounts } from "./(partials)/list-discounts"

export default function Page() {
  return  <ListDiscounts />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
