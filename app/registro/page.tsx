"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { register } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Building2, User, Briefcase, AlertCircle } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"client" | "broker">("client")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Attempting registration with:", email, "as", activeTab)
    const user = register(name, email, password, activeTab)
    console.log("[v0] Registration result:", user)

    if (user) {
      toast({
        title: "Cadastro realizado!",
        description: `Sua conta de ${activeTab === "client" ? "cliente" : "corretor"} foi criada com sucesso.`,
      })

      setTimeout(() => {
        window.location.href = activeTab === "broker" ? "/dashboard" : "/"
      }, 500)
    } else {
      const errorMsg = "Este email já está cadastrado. Por favor, use outro email ou faça login."
      setError(errorMsg)
      toast({
        title: "Erro no cadastro",
        description: errorMsg,
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#009B77]/10">
            <Building2 className="h-8 w-8 text-[#009B77]" />
          </div>
          <CardTitle className="text-2xl">Criar sua conta</CardTitle>
          <CardDescription>Cadastre-se como cliente ou corretor</CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "client" | "broker")} className="w-full">
          <TabsList className="mx-6 grid w-[calc(100%-3rem)] grid-cols-2">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Cliente
            </TabsTrigger>
            <TabsTrigger value="broker" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Corretor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nome completo</Label>
                  <Input
                    id="client-name"
                    type="text"
                    placeholder="João Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-password">Senha</Label>
                  <Input
                    id="client-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar como Cliente"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="font-medium text-[#009B77] hover:underline">
                    Faça login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="broker">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="broker-name">Nome completo</Label>
                  <Input
                    id="broker-name"
                    type="text"
                    placeholder="Maria Oliveira"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="broker-email">Email profissional</Label>
                  <Input
                    id="broker-email"
                    type="email"
                    placeholder="seu@imobiliaria.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="broker-password">Senha</Label>
                  <Input
                    id="broker-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
                </div>
                <div className="rounded-lg bg-[#009B77]/10 p-3">
                  <p className="text-xs text-muted-foreground">
                    Como corretor, você poderá cadastrar e gerenciar imóveis na plataforma.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar como Corretor"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="font-medium text-[#009B77] hover:underline">
                    Faça login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
