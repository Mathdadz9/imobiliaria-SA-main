"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProperties, deleteProperty } from "@/lib/properties"
import { getCurrentUser } from "@/lib/auth"
import type { Property, User } from "@/lib/types"
import { Plus, Pencil, Trash2, LayoutDashboard, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const typeLabels = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
      router.push("/login")
      return
    }

    if (currentUser.role !== "broker") {
      router.push("/")
      return
    }

    setUser(currentUser)
    loadProperties(currentUser.id)
  }, [router])

  const loadProperties = (brokerId: string) => {
    const allProperties = getProperties()
    const brokerProperties = allProperties.filter((p) => p.brokerId === brokerId)
    setProperties(brokerProperties)
  }

  const handleDelete = () => {
    if (!deleteId || !user) return

    const success = deleteProperty(deleteId)

    if (success) {
      loadProperties(user.id)
      toast({
        title: "Imóvel excluído",
        description: "O imóvel foi removido com sucesso.",
      })
    } else {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o imóvel.",
        variant: "destructive",
      })
    }

    setDeleteId(null)
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold text-balance md:text-4xl">
            <LayoutDashboard className="h-8 w-8 text-[#009B77]" />
            Dashboard do Corretor
          </h1>
          <p className="text-muted-foreground text-pretty">Gerencie seus imóveis cadastrados</p>
        </div>
        <Button onClick={() => router.push("/dashboard/novo")} size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Novo Imóvel
        </Button>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                  {typeLabels[property.type]}
                </Badge>
                {property.featured && (
                  <Badge className="absolute right-3 top-3 bg-[#009B77] text-white">Destaque</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-balance">{property.title}</h3>
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground text-pretty">{property.description}</p>
                <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{property.city}</span>
                </div>
                <p className="text-xl font-bold text-[#009B77]">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(property.price)}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 p-4 pt-0">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => router.push(`/dashboard/editar/${property.id}`)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                  onClick={() => setDeleteId(property.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
          <LayoutDashboard className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Nenhum imóvel cadastrado</h2>
          <p className="mb-6 text-muted-foreground text-pretty">
            Comece cadastrando seu primeiro imóvel para aparecer na plataforma.
          </p>
          <Button onClick={() => router.push("/dashboard/novo")}>
            <Plus className="mr-2 h-5 w-5" />
            Cadastrar Primeiro Imóvel
          </Button>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
