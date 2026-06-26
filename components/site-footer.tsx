import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

const columns = [
  {
    title: "Soluções",
    links: [
      { label: "Aplicativos Mobile", href: "#solucoes" },
      { label: "Sistemas e Sites Web", href: "#solucoes" },
      { label: "Integrações", href: "#solucoes" },
      { label: "Segurança dos Dados", href: "#solucoes" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Para quem", href: "#para-quem" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Perguntas Frequentes", href: "#faq" },
      { label: "Solicitar Orçamento", href: "#orcamento" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image src="/vks-logo.png" alt="VKS SOFT" width={120} height={56} className="h-8 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Software House especialista em aplicativos, sistemas web e integrações sob medida.
              Tecnologia que faz seu negócio crescer.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                (86) 99578-1666
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                vkssoft6@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                Atendimento em todo o Brasil
              </li>
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-card-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} VKS SOFT. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Política de Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
