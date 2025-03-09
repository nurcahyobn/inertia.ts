import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListCustomers } from "./(partials)/list-customers"

export default function Customers() {
  return  <ListCustomers />
}

Customers.layout = (page: React.ReactNode) => <AppLayout children={page} />
