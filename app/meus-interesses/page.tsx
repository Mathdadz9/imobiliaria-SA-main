"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { getUserInterests, removeInterest } from "@/lib/properties"
import { getCurrentUser } from "@/lib/auth"
import type { Property, User } from "@/lib/types"
import { Heart, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MeusInteressesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push("/login")
      return
    }

    if (currentUser.role !== "client") {
      router.push("/")
      return
    }

    setUser(currentUser)
    setProperties(getUserInterests(currentUser.id))
  }, [router])

  const handleRemoveInterest = (propertyId: string) => {
    if (!user) return

    removeInterest(user.id, propertyId)
    setProperties(getUserInterests(user.id))
    toast({
      title: "Interesse removido",
      description: "O imóvel foi removido da sua lista de interesses.",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-balance md:text-4xl">
          <Heart className="h-8 w-8 text-[#009B77]" />
          Meus Interesses
        </h1>
        <p className="text-muted-foreground text-pretty">Imóveis que você demonstrou interesse</p>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              actionButton={
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <a href={`/imovel/${property.id}`}>Ver Detalhes</a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveInterest(property.id)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
          <Heart className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Nenhum interesse registrado</h2>
          <p className="mb-6 text-muted-foreground text-pretty">
            Você ainda não demonstrou interesse em nenhum imóvel. Explore nosso catálogo e encontre o imóvel perfeito!
          </p>
          <Button asChild>
            <a href="/buscar">Buscar Imóveis</a>
          </Button>
        </div>
      )}
    </div>
  )
}
