import { create } from "zustand"

export type UserRole = "patient" | "doctor" | "government" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  image?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

// Mock users for demo
export const mockUsers = {
  patient: {
    id: "patient-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "patient" as UserRole,
    image: "/placeholder.svg?height=40&width=40",
  },
  doctor: {
    id: "doctor-1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cityhospital.com",
    role: "doctor" as UserRole,
    image: "/placeholder.svg?height=40&width=40",
  },
  government: {
    id: "gov-1",
    name: "Admin User",
    email: "admin@gov.health.org",
    role: "government" as UserRole,
    image: "/placeholder.svg?height=40&width=40",
  },
  student: {
    id: "student-1",
    name: "Alex Johnson",
    email: "alex.johnson@mru.edu",
    role: "student" as UserRole,
    image: "/placeholder.svg?height=40&width=40",
  },
}

// Auth helpers
export function requireAuth() {
  const { isAuthenticated, user } = useAuth.getState()
  return { isAuthenticated, user }
}

export function hasRole(role: UserRole) {
  const { user } = useAuth.getState()
  return user?.role === role
}
