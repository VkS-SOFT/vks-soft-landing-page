import Image from "next/image"
import { Smartphone, MonitorSmartphone, Plug, ShieldCheck, Infinity, Headset } from "lucide-react"

const services = [
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description:
      "Aplicativo para iPhone e Android funcionando perfeitamente. Seus clientes baixam na loja e usam no celular sem travamentos ou lentidão.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sistemas e Sites Web",
    description:
      "Site profissional ou sistema interno para sua empresa funcionar melhor. Você acessa de qualquer lugar, sempre disponível e seguro.",
  },
  {
    icon: Plug,
    title: "Integrações com Sistemas",
    description:
      "Seu aplicativo ou site conversa com outros sistemas que você já usa. Integramos pagamentos, gestão de clientes e ferramentas do dia a dia.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança dos Dados",
    description:
      "Proteção total das informações dos seus clientes e da sua empresa. Tudo dentro da lei, sem risco de vazamentos ou problemas.",
  },
  {
    icon: Infinity,
    title: "Funciona Sempre",
    description:
      "Seu aplicativo ou sistema fica no ar com alta disponibilidade e monitoramento, garantindo estabilidade para o seu negócio.",
  },
  {
    icon: Headset,
    title: "Suporte Dedicado",
    description:
      "Acompanhamento próximo durante e após a entrega. Você fala direto com quem desenvolve, com contrato e garantia.",
  },
]

export function ServicesSection() {
  return (
    <section id="solucoes" className="border-t border-border py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Soluções</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Soluções sob medida para o seu negócio
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Tecnologia completa, do código ao lançamento, com qualidade e escala.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-primary p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-secondary/60 blur-3xl"
              />
              <Image
                src="/feature-web.png"
                alt="Sistema web administrativo desenvolvido pela VKS SOFT"
                width={720}
                height={480}
                className="w-full rounded-xl bg-card"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Image
                  src="/feature-mobile.png"
                  alt="Aplicativo mobile desenvolvido pela VKS SOFT"
                  width={360}
                  height={360}
                  className="w-full rounded-xl bg-card"
                />
                <Image
                  src="/feature-integrations.png"
                  alt="Integrações entre sistemas desenvolvidas pela VKS SOFT"
                  width={360}
                  height={360}
                  className="w-full rounded-xl bg-card"
                />
              </div>
              <p className="mt-5 text-pretty text-sm font-medium leading-relaxed text-primary-foreground">
                Do app na palma da mão ao sistema completo no navegador, tudo conectado e seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
