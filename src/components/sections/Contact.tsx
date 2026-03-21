"use client";

import { useForm, ValidationError } from "@formspree/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import * as motion from "framer-motion/client";

export function Contact() {
    const [state, handleSubmit] = useForm("mlgpkwod");

    return (
        <section id="contact" className="relative w-full bg-brand-dark py-32 px-6 overflow-hidden">
            {/* Background glow for contact */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />

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
                        <p><strong>E-mail:</strong> feltecadmin@gmail.com</p>
                        <p><strong>Localização:</strong> Florianópolis, Santa Catarina</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8"
                >
                    {state.succeeded ? (
                        <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-8">
                            <p className="text-green-400 text-lg font-medium">Mensagem enviada com sucesso!</p>
                            <p className="text-white/50 text-sm">Nossa equipe entrará em contato em breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white/80">Nome</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Seu Nome"
                                    required
                                    className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-brand-primary"
                                />
                                <ValidationError prefix="Nome" field="name" errors={state.errors} className="text-red-400 text-xs" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/80">E-mail</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                    className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-brand-primary"
                                />
                                <ValidationError prefix="E-mail" field="email" errors={state.errors} className="text-red-400 text-xs" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-white/80">Mensagem</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Conte-nos sobre seu projeto..."
                                    required
                                    className="min-h-[120px] bg-black/50 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-brand-primary"
                                />
                                <ValidationError prefix="Mensagem" field="message" errors={state.errors} className="text-red-400 text-xs" />
                            </div>

                            <Button
                                type="submit"
                                disabled={state.submitting}
                                className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white rounded-xl h-12 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {state.submitting ? "Enviando..." : "Enviar Mensagem"}
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
