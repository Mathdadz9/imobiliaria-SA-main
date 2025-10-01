"use client"

import type React from "react"

import { useEffect } from "react"
import { initializeStorage } from "@/lib/auth"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeStorage()
  }, [])

  return <>{children}</>
}
