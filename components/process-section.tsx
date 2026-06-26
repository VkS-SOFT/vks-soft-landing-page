const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos seu negócio, objetivos e desafios para desenhar a solução ideal. Proposta em até 24 horas.",
  },
  {
    number: "02",
    title: "Planejamento",
    description:
      "Definimos escopo, funcionalidades, prazos e investimento com contrato claro e sem surpresas.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos seu app ou sistema em ciclos curtos, com entregas frequentes e total acompanhamento.",
  },
  {
    number: "04",
    title: "Lançamento & Suporte",
    description:
      "Publicamos nas lojas e no ar, com monitoramento, garantia e suporte dedicado contínuo.",
  },
]

export function ProcessSection() {
  return (
    <section className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Como funciona</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Um processo simples e transparente
          </h2>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-heading text-4xl font-bold text-primary/40">{step.number}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
