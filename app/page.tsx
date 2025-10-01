"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/property-card"
import { getFeaturedProperties } from "@/lib/properties"
import { getCurrentUser } from "@/lib/auth"
import type { Property } from "@/lib/types"
import { Search, Home, TrendingUp, Shield } from "lucide-react"

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    console.log("[v0] Checking auth state on home page")
    setFeaturedProperties(getFeaturedProperties())
    const user = getCurrentUser()
    console.log("[v0] Current user:", user)
    setIsLoggedIn(!!user)
  }, [pathname])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#009B77] to-[#007A5E] px-4 py-20 text-white md:py-32">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-5xl lg:text-6xl">
              Encontre o Imóvel dos Seus Sonhos
            </h1>
            <p className="mb-8 text-lg text-white/90 text-pretty md:text-xl">
              A Imobiliária Prime conecta você aos melhores imóveis do mercado. Casas, apartamentos e terrenos com
              qualidade e confiança.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-[#009B77] hover:bg-white/90">
                <Link href="/buscar">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Imóveis
                </Link>
              </Button>
              {!isLoggedIn && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10"
                >
                  <Link href="/registro">Cadastre-se Grátis</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border bg-muted/30 px-4 py-16">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#009B77]/10">
                <Home className="h-8 w-8 text-[#009B77]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Variedade de Imóveis</h3>
              <p className="text-muted-foreground text-pretty">
                Casas, apartamentos, terrenos e imóveis comerciais em diversas cidades.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#009B77]/10">
                <Shield className="h-8 w-8 text-[#009B77]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Segurança e Confiança</h3>
              <p className="text-muted-foreground text-pretty">
                Todos os imóveis são verificados e os corretores são certificados.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#009B77]/10">
                <TrendingUp className="h-8 w-8 text-[#009B77]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Melhores Oportunidades</h3>
              <p className="text-muted-foreground text-pretty">
                Encontre as melhores ofertas e oportunidades de investimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">Imóveis em Destaque</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Confira nossa seleção especial de imóveis premium
            </p>
          </div>

          {featuredProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Nenhum imóvel em destaque no momento.</p>
          )}

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/buscar">Ver Todos os Imóveis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="bg-[#333333] px-4 py-16 text-white">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl">Pronto para Encontrar seu Imóvel?</h2>
            <p className="mb-8 text-lg text-white/80 text-pretty">
              Cadastre-se gratuitamente e comece a explorar as melhores oportunidades do mercado imobiliário.
            </p>
            <Button asChild size="lg" className="bg-[#009B77] hover:bg-[#007A5E]">
              <Link href="/registro">Criar Conta Grátis</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
