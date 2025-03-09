import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListTaxes } from "./(partials)/list-taxes"

export default function Page() {
  return <ListTaxes />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
