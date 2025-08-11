import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plugins = [
  {
    name: "MessageCore",
    description: "Custom messages, anywhere",
    image: "https://i.imgur.com/DVB2XaA.png",
    href: "/docs/MessageCore",
  },
  {
    name: "GlobalQuests",
    description: "Quests to be completed by everyone.",
    image: "https://i.imgur.com/zar2ez4.png",
    href: "/docs/GlobalQuests",
  },
  {
    name: "PotionPal",
    description: "Hold an item in your offhand to gain potion effects.",
    image: "https://i.imgur.com/fLK1uzf.png",
    href: "/docs/PotionPal",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.15),transparent)] blur-2xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)] blur-2xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-10 text-center">

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Plugins by Alex</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Documentation for Alex’s Minecraft plugins. Clean, fast, and modern.
        </p>
        {/* CTA buttons removed per request */}
      </section>

      {/* Plugins showcase */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-muted-foreground">Plugins</h2>
          <Link href="/docs" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            View all docs
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plugins.map((p) => (
            <article
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              {/* Glow / border accent */}
              <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 [background:radial-gradient(40rem_40rem_at_100%_100%,rgba(59,130,246,0.15),transparent)] transition-opacity duration-700 group-hover:opacity-100" />

              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 -mt-10 px-5 pb-5">
                <div className="rounded-xl border border-white/5 bg-black/20 p-4 backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                    </div>
                    <Link href={p.href} className="shrink-0">
                      <Button size="sm" variant="secondary">
                        View docs
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
