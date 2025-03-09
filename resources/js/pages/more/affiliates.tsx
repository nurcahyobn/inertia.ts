import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListAffiliates } from "./(partials)/list-affiliates"

export default function Page() {
  return  <ListAffiliates />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
