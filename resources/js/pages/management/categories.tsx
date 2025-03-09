import AppLayout from "@/layouts/app-layout-user"
import type React from "react"
import ListCategories from "./(partials)/list-categories"

export default function categories() {
  return  <ListCategories />
}

categories.layout = (page: React.ReactNode) => <AppLayout children={page} />
