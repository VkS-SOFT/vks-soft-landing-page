import Image from "next/image"
import { ArrowRight, Sparkles, Clock } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { value: "100+", label: "Projetos Entregues" },
  { value: "50+", label: "Clientes Ativos" },
  { value: "98%", label: "Satisfação" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Software sob medida
          </span>

          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Desenvolvemos <span className="text-primary">Aplicativos</span> e Sistemas
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Criamos aplicativos e sistemas web personalizados e escaláveis que ajudam seu negócio a
            crescer em faturamento e produtividade.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#orcamento"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-primary text-primary-foreground hover:bg-secondary",
              )}
            >
              Começar um Projeto
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#solucoes"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-border bg-transparent text-foreground hover:bg-muted",
              )}
            >
              Ver Nosso Trabalho
            </a>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Resposta em até 24 horas
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-3xl font-bold text-foreground">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
          <Image
            src="/hero-app-mockup.png"
            alt="Aplicativo e sistema desenvolvidos pela VKS SOFT em dispositivos móveis e desktop"
            width={720}
            height={720}
            priority
            className="w-full rounded-2xl border border-border"
          />
        </div>
      </div>
    </section>
  )
}
