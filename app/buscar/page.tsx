"use client"

import { useEffect, useState } from "react"
import { PropertyCard } from "@/components/property-card"
import { searchProperties } from "@/lib/properties"
import type { Property } from "@/lib/types"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function BuscarPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [city, setCity] = useState<string>("all")
  const [type, setType] = useState<string>("all")

  useEffect(() => {
    const results = searchProperties(city, type)
    setProperties(results)
  }, [city, type])

  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Campinas", "Curitiba"]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-balance md:text-4xl">Buscar Imóveis</h1>
        <p className="text-muted-foreground text-pretty">Encontre o imóvel perfeito para você</p>
      </div>

      {/* Filters */}
      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Search className="h-5 w-5" />
          <span>Filtros de Busca</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Selecione uma cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Imóvel</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {properties.length} {properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>
      </div>

      {properties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-muted/30 p-12 text-center">
          <p className="text-lg text-muted-foreground">Nenhum imóvel encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  )
}
