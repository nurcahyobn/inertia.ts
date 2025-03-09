import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListShippingMethods } from "./(partials)/list-shipping-methods"

export default function Page() {
  return <ListShippingMethods />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
