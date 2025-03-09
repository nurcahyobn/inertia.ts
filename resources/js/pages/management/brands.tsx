import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListBrands } from "./(partials)/list-brands"

export default function Customers() {
  return  <ListBrands />
}

Customers.layout = (page: React.ReactNode) => <AppLayout children={page} />
