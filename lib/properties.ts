"use client"

import type { Property, Interest } from "./types"
import { initialProperties } from "./data"

const STORAGE_KEYS = {
  PROPERTIES: "imobiliaria_properties",
  INTERESTS: "imobiliaria_interests",
}

export function getProperties(): Property[] {
  if (typeof window === "undefined") return initialProperties
  const propertiesStr = localStorage.getItem(STORAGE_KEYS.PROPERTIES)
  return propertiesStr ? JSON.parse(propertiesStr) : initialProperties
}

export function getPropertyById(id: string): Property | null {
  const properties = getProperties()
  return properties.find((p) => p.id === id) || null
}

export function getFeaturedProperties(): Property[] {
  return getProperties().filter((p) => p.featured)
}

export function searchProperties(city?: string, type?: string): Property[] {
  let properties = getProperties()

  if (city && city !== "all") {
    properties = properties.filter((p) => p.city === city)
  }

  if (type && type !== "all") {
    properties = properties.filter((p) => p.type === type)
  }

  return properties
}

export function createProperty(property: Omit<Property, "id">): Property {
  if (typeof window === "undefined") throw new Error("Cannot create property on server")

  const properties = getProperties()
  const newProperty: Property = {
    ...property,
    id: Date.now().toString(),
  }

  properties.push(newProperty)
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties))

  return newProperty
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  if (typeof window === "undefined") return null

  const properties = getProperties()
  const index = properties.findIndex((p) => p.id === id)

  if (index === -1) return null

  properties[index] = { ...properties[index], ...updates }
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties))

  return properties[index]
}

export function deleteProperty(id: string): boolean {
  if (typeof window === "undefined") return false

  const properties = getProperties()
  const filtered = properties.filter((p) => p.id !== id)

  if (filtered.length === properties.length) return false

  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(filtered))

  // Also remove any interests for this property
  const interests = getInterests()
  const filteredInterests = interests.filter((i) => i.propertyId !== id)
  localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(filteredInterests))

  return true
}

export function getInterests(): Interest[] {
  if (typeof window === "undefined") return []
  const interestsStr = localStorage.getItem(STORAGE_KEYS.INTERESTS)
  return interestsStr ? JSON.parse(interestsStr) : []
}

export function getUserInterests(userId: string): Property[] {
  const interests = getInterests()
  const properties = getProperties()
  const userInterestIds = interests.filter((i) => i.userId === userId).map((i) => i.propertyId)
  return properties.filter((p) => userInterestIds.includes(p.id))
}

export function hasInterest(userId: string, propertyId: string): boolean {
  const interests = getInterests()
  return interests.some((i) => i.userId === userId && i.propertyId === propertyId)
}

export function addInterest(userId: string, propertyId: string): boolean {
  if (typeof window === "undefined") return false

  const interests = getInterests()

  // Check if already exists
  if (hasInterest(userId, propertyId)) return false

  const newInterest: Interest = {
    userId,
    propertyId,
    createdAt: new Date().toISOString(),
  }

  interests.push(newInterest)
  localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests))

  return true
}

export function removeInterest(userId: string, propertyId: string): boolean {
  if (typeof window === "undefined") return false

  const interests = getInterests()
  const filtered = interests.filter((i) => !(i.userId === userId && i.propertyId === propertyId))

  if (filtered.length === interests.length) return false

  localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(filtered))

  return true
}
