import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";
import Image from "next/image";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { TypedText } from "@/components/ui/TypedText";

function Hero() {
  return (
    <div className="relative min-h-[95vh] overflow-hidden bg-brand-dark rounded-[2rem] flex flex-col items-center border border-white/5 shadow-2xl bg-noise">
      <ParticlesBackground />
      {/* Background Animated Blobs - adjusted for noise and new colors */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none mix-blend-screen opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-brand-primary rounded-full filter blur-[120px] opacity-40"
        />
      </div>

      {/* Navigation Layer */}
      <nav className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-3 items-center z-10">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer">
          <Image src="/logo.svg" alt="Feltec" width={140} height={43} className="h-8 w-auto brightness-0 invert" priority />
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex justify-center">
          <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 text-sm font-medium text-white/70">
            <a href="#services" className="px-5 py-2 rounded-full bg-white text-black transition-colors">Serviços</a>
            <a href="#clients" className="px-5 py-2 rounded-full hover:text-white transition-colors">Clientes</a>
            <a href="#contact" className="px-5 py-2 rounded-full hover:text-white transition-colors">Empresa</a>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex justify-end">
          <a href="#contact">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-full cursor-pointer px-4 py-3 md:px-6 md:py-2 text-xs md:text-sm min-h-[44px]">
              Fale Conosco
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Content Layer */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 flex flex-col justify-center items-center text-center z-10 pt-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-semibold mb-12 glow-brand-badge">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            Elevando sua presença digital
          </div>

          <h1 className="text-5xl md:text-[5.5rem] font-medium tracking-tight mb-8 leading-[1.1] text-white">
            Soluções
            <br /> <TypedText />
            <br />
            <span className="text-brand-muted">de Próxima Geração.</span>
          </h1>

          <p className="text-base md:text-lg text-brand-paragraph mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
            Desenvolvemos landing pages premium, ERPs integrados, CRMs profundos
            e automações de processos inteligentes projetados para escalar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-8 h-12 text-sm font-medium w-full sm:w-auto flex items-center gap-2 group cursor-pointer border-none"
              >
                Começar seu Projeto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a
              href="https://wa.me/5548992466485"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-sm font-medium w-full sm:w-auto border-white/10 bg-transparent hover:bg-white/5 text-white cursor-pointer transition-colors flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-primary text-foreground p-1 md:p-2 font-sans">
      <Hero />
      <div className="bg-brand-dark mt-3 shadow-2xl relative z-10 rounded-[2rem] overflow-hidden">
        {/* <Clients /> */}
        <Services />
        <Contact />

        {/* Footer */}
        <footer className="w-full bg-brand-dark py-8 text-center border-t border-white/5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white/40 text-sm"
          >
            © {new Date().getFullYear()} Feltec. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  );
}
