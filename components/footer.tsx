import { Building2, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
              <Building2 className="h-6 w-6" />
              <span>Imobiliária Prime</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sua parceira ideal para encontrar o imóvel dos seus sonhos. Qualidade, confiança e excelência em cada
              negócio.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/buscar" className="hover:text-primary">
                  Buscar Imóveis
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-primary">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@imobiliariaprime.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Imobiliária Prime. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
