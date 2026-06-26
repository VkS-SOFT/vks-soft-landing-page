import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Proposta personalizada em até 24h",
  "Contrato com prazos e garantia",
  "Publicação nas lojas e no ar",
  "Suporte dedicado pós-entrega",
]

export function FinalCta() {
  return (
    <section id="orcamento" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"
          />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Vamos transformar sua ideia em software
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Conte sobre seu projeto e receba uma proposta sob medida. Sem compromisso e com
                resposta em até 24 horas.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-card-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <form className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" name="nome" placeholder="Seu nome" />
                <Field label="WhatsApp" name="telefone" placeholder="(00) 00000-0000" type="tel" />
              </div>
              <Field label="E-mail" name="email" placeholder="voce@email.com" type="email" />
              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-card-foreground">
                  Sobre o projeto
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  placeholder="Conte o que você precisa..."
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-secondary"
              >
                Solicitar Orçamento Gratuito
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Seus dados estão seguros. Não enviamos spam.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string
  name: string
  placeholder: string
  type?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-card-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  )
}
