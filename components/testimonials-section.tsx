import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "A VKS entregou nosso aplicativo dentro do prazo e acima das expectativas. As vendas pelo app já representam 40% do faturamento.",
    name: "Marina Costa",
    role: "CEO, Loja Digital",
    initials: "MC",
  },
  {
    quote:
      "Automatizamos processos que tomavam horas da equipe. O sistema é estável, rápido e o suporte responde muito rápido.",
    name: "Rafael Lima",
    role: "Diretor de Operações",
    initials: "RL",
  },
  {
    quote:
      "Validamos nosso MVP em poucas semanas e captamos investimento. Tecnologia que escalou junto com a gente.",
    name: "Juliana Alves",
    role: "Fundadora de Startup",
    initials: "JA",
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Depoimentos</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Quem confia na VKS SOFT
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-card-foreground">
                {`"${item.quote}"`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {item.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-card-foreground">
                    {item.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
