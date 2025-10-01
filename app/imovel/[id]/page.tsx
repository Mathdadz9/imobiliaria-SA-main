"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPropertyById, addInterest, removeInterest, hasInterest } from "@/lib/properties"
import { getCurrentUser } from "@/lib/auth"
import type { Property, User } from "@/lib/types"
import { MapPin, Heart, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const typeLabels = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
}

export default function PropertyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [property, setProperty] = useState<Property | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [interested, setInterested] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const prop = getPropertyById(id)
    setProperty(prop)

    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (currentUser && prop) {
      setInterested(hasInterest(currentUser.id, prop.id))
    }
  }, [params.id])

  const handleInterest = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para demonstrar interesse.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (user.role !== "client") {
      toast({
        title: "Ação não permitida",
        description: "Apenas clientes podem demonstrar interesse em imóveis.",
        variant: "destructive",
      })
      return
    }

    if (!property) return

    if (interested) {
      removeInterest(user.id, property.id)
      setInterested(false)
      toast({
        title: "Interesse removido",
        description: "O imóvel foi removido da sua lista de interesses.",
      })
    } else {
      addInterest(user.id, property.id)
      setInterested(true)
      toast({
        title: "Interesse registrado!",
        description: "O imóvel foi adicionado à sua lista de interesses.",
      })
    }
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-muted-foreground">Imóvel não encontrado.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden rounded-lg lg:aspect-square">
          <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge className="mb-3 bg-[#009B77] text-white">{typeLabels[property.type]}</Badge>
            <h1 className="mb-3 text-3xl font-bold text-balance md:text-4xl">{property.title}</h1>
            <div className="mb-4 flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{property.city}</span>
            </div>
            <p className="text-4xl font-bold text-[#009B77]">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(property.price)}
            </p>
          </div>

          <div className="mb-6 border-t border-border pt-6">
            <h2 className="mb-3 text-xl font-semibold">Descrição</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">{property.description}</p>
          </div>

          {user?.role === "client" && (
            <Button onClick={handleInterest} size="lg" className="mt-auto" variant={interested ? "outline" : "default"}>
              <Heart className={`mr-2 h-5 w-5 ${interested ? "fill-current" : ""}`} />
              {interested ? "Remover Interesse" : "Tenho Interesse"}
            </Button>
          )}

          {!user && (
            <div className="mt-auto rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-3 text-sm text-muted-foreground">
                Faça login para demonstrar interesse neste imóvel e entrar em contato com o corretor.
              </p>
              <Button onClick={() => router.push("/login")} className="w-full">
                Fazer Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
