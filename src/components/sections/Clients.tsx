import { Code } from "lucide-react";
import * as motion from "framer-motion/client";

const clients = [
    "Acme Corp", "GlobalTech", "Nexus Industries", "Quantum Solutions",
    "Starlight Media", "Vanguard Financial", "Apex Innovations", "Zenith Logistics"
];

export function Clients() {
    return (
        <section id="clients" className="relative w-full bg-[#161616] py-20 px-6 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-medium text-white/50 tracking-wider uppercase mb-2">Confiado por</p>
                    <h2 className="text-2xl font-semibold text-white/80">Empresas inovadoras em todo o mundo</h2>
                </motion.div>

                {/* Marquee effect for clients */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
                >
                    <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                        {clients.map((client, idx) => (
                            <li key={idx} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <Code className="w-6 h-6 text-[#1C5E3C]" />
                                <span className="text-xl font-medium text-white">{client}</span>
                            </li>
                        ))}
                        {/* Duplicate for infinite scroll */}
                        {clients.map((client, idx) => (
                            <li key={`dup-${idx}`} className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <Code className="w-6 h-6 text-[#1C5E3C]" />
                                <span className="text-xl font-medium text-white">{client}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
