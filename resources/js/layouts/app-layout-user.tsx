import { SidebarInset, SidebarProvider } from "ui"
import { AppSidebarNav } from "./app-sidebar-nav"
import AppSidebar from "./app-sidebar"
import { FlashMessage } from "@/components/flash-message"
import type { PropsWithChildren } from "react"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <FlashMessage />
      <SidebarProvider>
        <AppSidebar collapsible="dock" />
        <SidebarInset>
          <AppSidebarNav />
          <div className="flex flex-col gap-y-6 p-(--inset-padding) [--inset-padding:calc(var(--spacing)*4)] lg:[--inset-padding:calc(var(--spacing)*6)]">
          {children}
        </div>
        </SidebarInset>
      </SidebarProvider>

    </div>
  )
}
