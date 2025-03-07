"use client"

import { mainNavigations, navigations } from "@/layouts/app-sidebar"
import { router } from '@inertiajs/react'

import { CommandMenu, type CommandMenuProps } from "ui"

const items = [...mainNavigations, ...navigations]

export function CommandPalette(props: Omit<CommandMenuProps, "children">) {

  function go(url: string) {
    router.push({url})
    props.onOpenChange?.(false)
  }

  return (
    <CommandMenu {...props}>
      <CommandMenu.Search placeholder="Quick search..." />
      <CommandMenu.List>
        {items.map((item) => (
          <CommandMenu.Section key={item.title} title={item.title}>
            {item.children?.map((child) => (
              <CommandMenu.Item
                textValue={child.name}
                key={child.name}
                onAction={() => go(child.path)}
              >
                {child.icon && <child.icon />}
                <CommandMenu.Label>{child.name}</CommandMenu.Label>
              </CommandMenu.Item>
            ))}
          </CommandMenu.Section>
        ))}
      </CommandMenu.List>
    </CommandMenu>
  )
}
