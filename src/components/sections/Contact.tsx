import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import * as motion from "framer-motion/client";

export function Contact() {
    return (
        <section id="contact" className="relative w-full bg-[#161616] py-32 px-6 overflow-hidden">
            {/* Background glow for contact */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F05B43]/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row gap-16">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Vamos construir algo incrível.</h2>
                    <p className="text-white/60 text-lg mb-8">
                        Pronto para transformar suas ideias em realidade? Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
                    </p>

                    <div className="space-y-4 text-white/80">
                        <p><strong>E-mail:</strong> contato@feltech.com</p>
                        <p><strong>Localização:</strong> São Paulo, Brasil</p>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8"
                >
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white/80">Nome</Label>
                            <Input id="name" placeholder="Seu Nome" className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#F05B43]" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/80">E-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#F05B43]" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-white/80">Mensagem</Label>
                            <Textarea
                                id="message"
                                placeholder="Conte-nos sobre seu projeto..."
                                className="min-h-[120px] bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#F05B43]"
                            />
                        </div>

                        <Button className="w-full bg-[#F05B43] hover:bg-[#F05B43]/80 text-white rounded-xl h-12 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            Enviar Mensagem
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
