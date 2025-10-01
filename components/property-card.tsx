import type React from "react"
import Link from "next/link"
import Image from "next/image"
import type { Property } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface PropertyCardProps {
  property: Property
  showActions?: boolean
  actionButton?: React.ReactNode
}

const typeLabels = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
}

export function PropertyCard({ property, showActions = true, actionButton }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{typeLabels[property.type]}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-balance">{property.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground text-pretty">{property.description}</p>
        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{property.city}</span>
        </div>
        <p className="text-2xl font-bold text-primary">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(property.price)}
        </p>
      </CardContent>
      {showActions && (
        <CardFooter className="p-4 pt-0">
          {actionButton || (
            <Button asChild className="w-full">
              <Link href={`/imovel/${property.id}`}>Ver Detalhes</Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
