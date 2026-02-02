"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-xl hover:bg-muted transition-colors"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl p-1.5 min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-lg cursor-pointer"
        >
          <Sun className="h-4 w-4 mr-2 opacity-60" />
          Light
          {theme === "light" && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-lg cursor-pointer"
        >
          <Moon className="h-4 w-4 mr-2 opacity-60" />
          Dark
          {theme === "dark" && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-lg cursor-pointer"
        >
          <Monitor className="h-4 w-4 mr-2 opacity-60" />
          System
          {theme === "system" && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
