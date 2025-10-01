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
import { login } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { Building2, User, Briefcase, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Attempting login with:", email)
    const user = login(email, password)
    console.log("[v0] Login result:", user)

    if (user) {
      toast({
        title: "Login realizado!",
        description: `Bem-vindo de volta, ${user.name}!`,
      })

      setTimeout(() => {
        if (user.role === "broker") {
          window.location.href = "/dashboard"
        } else {
          window.location.href = "/"
        }
      }, 500)
    } else {
      const errorMsg = "Email ou senha incorretos. Verifique suas credenciais e tente novamente."
      setError(errorMsg)
      toast({
        title: "Erro no login",
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
          <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
          <CardDescription>Escolha o tipo de conta e faça login</CardDescription>
        </CardHeader>

        <Tabs defaultValue="client" className="w-full">
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
                  <Label htmlFor="email-client">Email</Label>
                  <Input
                    id="email-client"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-client">Senha</Label>
                  <Input
                    id="password-client"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <p className="font-medium">Conta de teste:</p>
                  <p>Email: joao@email.com</p>
                  <p>Senha: senha123</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar como Cliente"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link href="/registro" className="font-medium text-[#009B77] hover:underline">
                    Cadastre-se
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
                  <Label htmlFor="email-broker">Email</Label>
                  <Input
                    id="email-broker"
                    type="email"
                    placeholder="corretor@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-broker">Senha</Label>
                  <Input
                    id="password-broker"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <p className="font-medium">Conta de teste:</p>
                  <p>Email: maria@imobiliaria.com</p>
                  <p>Senha: senha123</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar como Corretor"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Acesso exclusivo para corretores cadastrados
                </p>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
