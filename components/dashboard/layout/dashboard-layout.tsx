"use client"

import type React from "react"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { AuthGuard } from "./auth-guard"
import type { UserRole } from "@/lib/auth"

interface DashboardLayoutProps {
  children: ReactNode
  sidebarItems: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
  footerItems?: {
    title: string
    href: string
    icon: React.ReactNode
  }[]
  title: string
  user: {
    name: string
    email: string
    image?: string
  }
  notifications?: number
  requiredRole?: UserRole
}

export function DashboardLayout({
  children,
  sidebarItems,
  footerItems,
  title,
  user,
  notifications = 0,
  requiredRole,
}: DashboardLayoutProps) {
  return (
    <AuthGuard requiredRole={requiredRole}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar items={sidebarItems} footerItems={footerItems} title="MediChain" />

        <div className="md:ml-[70px] lg:ml-[250px]">
          <Header title={title} user={user} notifications={notifications} />

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}

