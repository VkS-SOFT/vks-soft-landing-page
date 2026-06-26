import { Megaphone, Building2, Rocket, Globe, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const audiences = [
  {
    icon: Megaphone,
    title: "Infoprodutores",
    description:
      "Se você usa as redes sociais para vender cursos, mentorias e produtos digitais.",
  },
  {
    icon: Building2,
    title: "Empresas",
    description:
      "Se você possui uma empresa e deseja melhorar a produtividade e o faturamento.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description:
      "Se deseja construir um MVP validado em semanas. Tecnologia que escala conforme você cresce.",
  },
  {
    icon: Globe,
    title: "Negócios Digitais",
    description: "Se possui um negócio digital e deseja desenvolver um software sob medida.",
  },
]

export function AudienceSection() {
  return (
    <section id="para-quem" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Para quem desenvolvemos
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Soluções para todo tipo de negócio
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-12 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-primary p-8 text-center sm:flex-row sm:text-left">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-secondary/60 blur-3xl"
          />
          <div className="relative">
            <h3 className="font-heading text-xl font-semibold text-primary-foreground">
              Se encaixa? Vamos conversar
            </h3>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Resposta em até 24 horas, sem compromisso.
            </p>
          </div>
          <a
            href="#orcamento"
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative bg-background text-primary hover:bg-accent",
            )}
          >
            Quero meu orçamento gratuito
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
