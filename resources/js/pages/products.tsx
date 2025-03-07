import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListProducts } from "./(partials)/list-products"

export default function Customers() {
  return <ListProducts />
}

Customers.layout = (page: React.ReactNode) => <AppLayout children={page} />
