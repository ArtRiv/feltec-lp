import BriefingForm from "@/components/forms/BriefingForm";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import * as motion from "framer-motion/client";
import { Toaster } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BriefingEcommercePage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <ParticlesBackground />
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none mix-blend-screen opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full filter blur-[150px] opacity-40"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-brand-primary rounded-full filter blur-[150px] opacity-20"
        />
      </div>

      <Toaster position="top-center" theme="dark" />
      
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 z-20 relative flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight text-white">
            Feltec
          </span>
        </div>
      </nav>

      <main className="flex-1 w-full mx-auto relative z-10 overflow-y-auto w-full">
        <BriefingForm />
      </main>
    </div>
  );
}
