"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Quanto tempo leva para receber o orçamento?",
    answer:
      "Enviamos uma proposta personalizada em até 24 horas após entendermos seu projeto. Sem compromisso e sem custo.",
  },
  {
    question: "Quanto custa desenvolver um aplicativo ou sistema?",
    answer:
      "O investimento varia conforme o escopo e as funcionalidades. Por isso fazemos um diagnóstico antes e apresentamos um orçamento claro, com contrato e prazos definidos.",
  },
  {
    question: "Vocês publicam o app nas lojas (App Store e Google Play)?",
    answer:
      "Sim. Cuidamos de todo o processo de publicação nas lojas, além da hospedagem e configuração de sistemas web.",
  },
  {
    question: "Como funciona o suporte após a entrega?",
    answer:
      "Oferecemos suporte dedicado, monitoramento e garantia. Você fala diretamente com a equipe que desenvolveu o seu projeto.",
  },
  {
    question: "Vocês fazem integrações com sistemas que já uso?",
    answer:
      "Sim. Integramos pagamentos, CRMs, ERPs, gateways e diversas ferramentas para que tudo funcione de forma conectada.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Perguntas Frequentes
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo o que você precisa saber
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-card-foreground">{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
