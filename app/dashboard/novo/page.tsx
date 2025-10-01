"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createProperty } from "@/lib/properties"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export default function NovoImovelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  const [type, setType] = useState<"casa" | "apartamento" | "terreno" | "comercial">("casa")
  const [image, setImage] = useState("")
  const [featured, setFeatured] = useState(false)

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
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)

    try {
      createProperty({
        title,
        description,
        price: Number.parseFloat(price),
        city,
        type,
        image: image || "/modern-real-estate.png",
        brokerId: user.id,
        featured,
      })

      toast({
        title: "Imóvel cadastrado!",
        description: "O imóvel foi adicionado com sucesso.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o imóvel.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrar Novo Imóvel</CardTitle>
          <CardDescription>Preencha os dados do imóvel para adicionar ao catálogo</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Imóvel</Label>
              <Input
                id="title"
                placeholder="Ex: Casa Moderna em Condomínio Fechado"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva as características do imóvel..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="850000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  step="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Imóvel</Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL da Imagem (opcional)</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Deixe em branco para usar uma imagem padrão</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked === true)} />
              <Label htmlFor="featured" className="cursor-pointer text-sm font-normal">
                Marcar como imóvel em destaque na página inicial
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Cadastrando..." : "Cadastrar Imóvel"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
