import { CommandPalette } from "@/components/command-palette"
import { ThemeToggle } from "@/components/theme-toggle"
import notifications from "@/data/notifications.json"
import {
  IconBell,
  IconCirclePerson,
  IconGear,
  IconGraph,
  IconLogout,
  IconSearch,
  IconShield,
  IconWindowVisit,
} from "justd-icons"
import { useState } from "react"
import {
  Avatar,
  Button,
  Link,
  Menu,
  Separator,
  SidebarNav,
  SidebarTrigger,
  Tooltip,
  buttonStyles,
} from "ui"

export function AppSidebarNav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CommandPalette shortcut="k" isOpen={open} onOpenChange={setOpen} />
      <SidebarNav className="h-13 border-b">
        <span className="flex items-center gap-x-4">
          <SidebarTrigger className="-ml-2 -mr-2.5" />
          <Button
            onPress={() => setOpen(true)}
            intent="outline"
            className="justify-start sm:min-w-56"
          >
            <IconSearch />
            <span className="hidden text-muted-fg sm:inline">Search...</span>
          </Button>
        </span>
        <div className="ml-auto flex items-center gap-x-1">
          <Tooltip>
            <Link
              href="/analytics"
              className={buttonStyles({ size: "sq-xs", intent: "plain", shape: "circle" })}
              aria-label="Open analytics"
            >
              <IconGraph />
            </Link>
            <Tooltip.Content>Open analytics</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Link
              href="/settings/general"
              className={buttonStyles({ size: "sq-xs", intent: "plain", shape: "circle" })}
              aria-label="Open activities"
            >
              <IconGear />
            </Link>
            <Tooltip.Content>Open settings</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Link
              href="/activities"
              className={buttonStyles({ size: "sq-xs", intent: "plain", shape: "circle" })}
              aria-label="Open activities"
            >
              <IconWindowVisit />
            </Link>
            <Tooltip.Content>Open activities</Tooltip.Content>
          </Tooltip>
          <UserNotification />
          <ThemeToggle />
          <Separator className="mr-2 h-6" orientation="vertical" />
          <UserMenu />
        </div>
      </SidebarNav>
    </>
  )
}

function UserNotification() {
  return (
    <Menu>
      <Button size="sq-xs" intent="plain" shape="circle" aria-label="Open notifications">
        <IconBell />
      </Button>
      <Menu.Content placement="bottom end" items={notifications} className="sm:max-w-60">
       {(item) => (
          <Menu.Item key={item.id} className="relative">
            {item.status === "unread" && (
              <span
                aria-hidden
                className="absolute top-2 right-2 grid size-2.5 place-content-center rounded-full bg-primary/30 *:size-1 *:rounded-full *:bg-primary"
              >
                <span aria-hidden />
              </span>
            )}
            <Menu.ItemDetails label={item.type} description={item.message} />
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu>
  )
}

function UserMenu() {
  return (
    <Menu>
      <Menu.Trigger aria-label="Open Menu">
        <Avatar size="small" alt="John Lennon" src="/images/avatar/john-lennon.jpg" />
      </Menu.Trigger>
      <Menu.Content placement="bottom end" className="sm:min-w-56">
        <Menu.Section>
          <Menu.Header separator>
            <span className="block">John Lennon</span>
            <span className="font-normal text-muted-fg">Administrator</span>
          </Menu.Header>
        </Menu.Section>
        <Menu.Item href="/settings/general">
          <IconGear />
          <Menu.Label>General Settings</Menu.Label>
        </Menu.Item>
        <Menu.Item href="#profile">
          <IconCirclePerson />
          <Menu.Label>Profile</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item href="#user-management">
          <Menu.Label>User Management</Menu.Label>
        </Menu.Item>
        <Menu.Item href="#roles">
          <IconShield />
          <Menu.Label>Roles & Permissions</Menu.Label>
        </Menu.Item>
        <Menu.Item href="#audit-logs">
          <Menu.Label>Audit Logs</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item href="#system-status">
          <span
            aria-hidden
            data-slot="icon"
            className="grid size-4 place-content-center rounded-full bg-primary/30 *:size-1.5 *:animate-pulse *:rounded-full *:bg-primary group-data-hovered:*:animate-none"
          >
            <span aria-hidden />
          </span>
          <Menu.Label>System Status</Menu.Label>
        </Menu.Item>
        <Menu.Item href="#integrations">
          <Menu.Label>Integrations</Menu.Label>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item href="/login">
          <IconLogout />
          <Menu.Label>Log out</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
