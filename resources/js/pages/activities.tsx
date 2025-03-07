import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import { ListActivities } from "./(partials)/list-activities"

export default function Page() {
  return <ListActivities />
}

Page.layout = (page: React.ReactNode) => <AppLayout children={page} />
