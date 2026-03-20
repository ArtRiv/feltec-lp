import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";
import * as motion from "framer-motion/client";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { Contact } from "@/components/sections/Contact";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { TypedText } from "@/components/ui/TypedText";

function Hero() {
  return (
    <div className="relative min-h-[95vh] overflow-hidden bg-[#161616] rounded-[2rem] flex flex-col items-center border border-white/5 shadow-2xl bg-noise">
      <ParticlesBackground />
      {/* Background Animated Blobs - adjusted for noise and new colors */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none mix-blend-screen opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#F05B43] rounded-full filter blur-[120px] opacity-40"
        />
      </div>

      {/* Navigation Layer */}
      <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 cursor-pointer">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 flex items-center justify-center text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <span className="text-2xl font-medium tracking-tight text-white">
            Feltech
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 text-sm font-medium text-white/70">
          <a
            href="#services"
            className="px-5 py-2 rounded-full bg-white text-black transition-colors"
          >
            Serviços
          </a>
          <a
            href="#clients"
            className="px-5 py-2 rounded-full hover:text-white transition-colors"
          >
            Clientes
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full hover:text-white transition-colors"
          >
            Empresa
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:block text-sm font-medium text-white/80 hover:text-white"
          >
            Entrar
          </a>
          <a href="#contact">
            <Button className="bg-[#F05B43] hover:bg-[#F05B43]/90 text-white font-medium rounded-full cursor-pointer px-6">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[#A5A69E] text-sm font-medium mb-12">
            <span className="w-2 h-2 rounded-full bg-[#1C5E3C] animate-pulse"></span>
            Elevando sua presença digital
          </div>

          <h1 className="text-5xl md:text-[5.5rem] font-medium tracking-tight mb-8 leading-[1.1] text-white">
            Soluções
            <br className="md:hidden" /> <TypedText />
            <br />
            <span className="text-[#A5A69E]">de Próxima Geração.</span>
          </h1>

          <p className="text-base md:text-lg text-[#858585] mb-12 max-w-2xl mx-auto font-normal leading-relaxed">
            Desenvolvemos landing pages premium, ERPs integrados, CRMs profundos
            e automações de processos inteligentes projetados para escalar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#F05B43] hover:bg-[#F05B43]/90 text-white rounded-full px-8 h-12 text-sm font-medium w-full sm:w-auto flex items-center gap-2 group cursor-pointer border-none"
              >
                Começar seu Projeto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#clients" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-sm font-medium w-full sm:w-auto border-white/10 bg-transparent hover:bg-white/5 text-white cursor-pointer transition-colors"
              >
                Ver Nosso Trabalho
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
    <div className="min-h-screen bg-[#F05B43] text-foreground p-2 md:p-4 font-sans">
      <Hero />
      <div className="bg-[#161616] mt-4 shadow-2xl relative z-10 rounded-[2rem] overflow-hidden">
        <Clients />
        <div className="bg-[#BDBDBA]">
          <Services />
        </div>
        <Contact />

        {/* Footer */}
        <footer className="w-full bg-[#161616] py-8 text-center border-t border-white/5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white/40 text-sm"
          >
            © {new Date().getFullYear()} Feltech. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  );
}
