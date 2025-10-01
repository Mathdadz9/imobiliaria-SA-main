"use client"

import type { User } from "./types"
import { initialUsers, initialProperties, initialInterests } from "./data"

const STORAGE_KEYS = {
  CURRENT_USER: "imobiliaria_current_user",
  USERS: "imobiliaria_users",
  PROPERTIES: "imobiliaria_properties",
  INTERESTS: "imobiliaria_interests",
}

// Initialize localStorage with default data
export function initializeStorage() {
  if (typeof window === "undefined") return

  const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS)
  if (!existingUsers) {
    console.log("[v0] Initializing storage with default users")
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers))
  } else {
    console.log("[v0] Storage already initialized, users count:", JSON.parse(existingUsers).length)
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(initialProperties))
  }
  if (!localStorage.getItem(STORAGE_KEYS.INTERESTS)) {
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(initialInterests))
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  console.log("[v0] getCurrentUser - raw value:", userStr)
  return userStr ? JSON.parse(userStr) : null
}

export function login(email: string, password: string): User | null {
  if (typeof window === "undefined") return null

  initializeStorage()

  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS)
  const users: User[] = usersStr ? JSON.parse(usersStr) : []

  console.log("[v0] Login - Users in storage:", users.length)
  console.log("[v0] Login - Looking for:", email)

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    console.log("[v0] User found, logging in:", user.email)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    const verification = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    console.log("[v0] Login - Verification after save:", verification ? "SUCCESS" : "FAILED")
    return user
  }

  console.log("[v0] User not found with email:", email)
  return null
}

export function register(
  name: string,
  email: string,
  password: string,
  role: "client" | "broker" = "client",
): User | null {
  if (typeof window === "undefined") return null

  initializeStorage()

  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS)
  const users: User[] = usersStr ? JSON.parse(usersStr) : []

  console.log("[v0] Register - Current users in storage:", users.length)

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    console.log("[v0] Email already exists:", email)
    return null
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role,
  }

  users.push(newUser)

  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))

  // Verify the save was successful
  const verifyUsers = localStorage.getItem(STORAGE_KEYS.USERS)
  const verifyCurrentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  console.log("[v0] Register - Users saved:", verifyUsers ? JSON.parse(verifyUsers).length : 0)
  console.log("[v0] Register - Current user saved:", verifyCurrentUser ? "SUCCESS" : "FAILED")
  console.log("[v0] New user registered:", newUser.email, "as", newUser.role)

  return newUser
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  console.log("[v0] User logged out")
}
