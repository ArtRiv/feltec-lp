import * as motion from "framer-motion/client";

const services = [
    {
        title: "Experiência do\nCliente",
        description: "Crie experiências de cliente incomparáveis entendendo cada interação, melhorando a qualidade e corrigindo problemas antes que eles afetem os usuários.",
        bgColor: "bg-service-1",
        textColor: "text-brand-dark"
    },
    {
        title: "Conformidade e\nSegurança",
        description: "Automatize o monitoramento de conformidade em 100% das interações para reduzir riscos, garantir adesão e eliminar auditorias manuais.",
        bgColor: "bg-service-2",
        textColor: "text-brand-dark"
    },
    {
        title: "Operações e\nDesempenho",
        description: "Substitua processos manuais por soluções automatizadas que otimizam fluxos de trabalho, melhoram a eficiência e cortam drasticamente os custos.",
        bgColor: "bg-service-3",
        textColor: "text-brand-dark"
    },
    {
        title: "Vendas &\nMarketing",
        description: "Desbloqueie o crescimento da receita identificando oportunidades de vendas, reduzindo o churn e otimizando mensagens em todos os canais.",
        bgColor: "bg-service-4",
        textColor: "text-brand-dark"
    }
];

export function Services() {
    return (
        <section id="services" className="relative w-full py-24 px-6 md:px-12 bg-brand-surface rounded-[2rem] overflow-hidden -mt-4 z-20">
            <div className="max-w-6xl mx-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-sm font-medium text-brand-subtle mb-4">Construído para cada função</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-dark mb-6 leading-[1.1]">
                        Para as pessoas que<br className="hidden md:block" /> mantêm tudo funcionando
                    </h2>
                    <p className="description text-base text-brand-body max-w-xl font-medium">
                        A próxima era digital pertence às equipes que não esperam por insights, elas agem a partir deles.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`group relative p-10 md:p-12 rounded-[2rem] ${service.bgColor} overflow-hidden`}
                        >
                            <h3 className={`text-3xl font-medium ${service.textColor} mb-8 whitespace-pre-line leading-tight`}>
                                {service.title}
                            </h3>
                            <p className={`${service.textColor} opacity-80 text-sm md:text-base leading-relaxed max-w-[85%] font-medium`}>
                                {service.description}
                            </p>

                            {/* Decorative circles mimicking the image */}
                            <div className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full border border-brand-dark absolute" />
                                <div className="w-32 h-32 rounded-full border border-brand-dark absolute translate-x-4" />
                                <div className="w-32 h-32 rounded-full border border-brand-dark absolute translate-x-8" />
                                <div className="w-40 h-40 rounded-full border border-brand-dark absolute" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
