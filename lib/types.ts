export type UserRole = "client" | "broker"

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
}

export interface Property {
  id: string
  title: string
  description: string
  price: number
  city: string
  type: "casa" | "apartamento" | "terreno" | "comercial"
  image: string
  brokerId: string
  featured?: boolean
}

export interface Interest {
  userId: string
  propertyId: string
  createdAt: string
}
