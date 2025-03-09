"use client"

import { useTheme } from "@/providers/theme-provider"
// import { useTheme } from "@/providers/theme-provider"
import { IconMoon, IconSun } from "justd-icons"
import { Button } from "ui"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      onPress={() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }}
      intent="plain"
      size="sq-xs"
      shape="circle"
    >
      {theme === "dark" ? <IconMoon /> : <IconSun />}
    </Button>
  )
}
