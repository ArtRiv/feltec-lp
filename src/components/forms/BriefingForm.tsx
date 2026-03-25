"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxfirgx3G1pL0KBwgSjusulpF6FTMYui3gdSACWAehYBtgGj1oszFFcWfGP7aK3001saQ/exec";

type StepField = {
  type: "text" | "email" | "textarea";
  name: string;
  label: string;
  required?: boolean;
};

interface Step {
  title: string;
  fields: StepField[];
}

const steps: Step[] = [
  {
    title: "Identificação Inicial",
    fields: [
      { type: "text", name: "name", label: "Nome Completo", required: true },
      { type: "email", name: "email", label: "E-mail Corporativo", required: true },
      { type: "text", name: "company", label: "Empresa", required: true },
    ],
  },
  {
    title: "Gestão de Produtos",
    fields: [
      { type: "textarea", name: "q1", label: "Quais produtos serão vendidos na plataforma?", required: true },
      { type: "textarea", name: "q2", label: "Quantas e quais variações (cor, tamanho, modelo) cada produto terá?" },
      { type: "text", name: "q3", label: "Haverá produtos digitais, físicos ou ambos?" },
      { type: "text", name: "q9", label: "Como os produtos serão categorizados? (tipos de produtos vendidos)" },
      { type: "text", name: "q12", label: "Haverá uma opção de 'customize seu produto'?" },
      { type: "textarea", name: "q22", label: "Quais categorias de produtos serão exibidas?" },
      { type: "text", name: "q36", label: "Haverá categorias especiais como 'Lançamentos' e 'Mais Vendidos'?" },
    ],
  },
  {
    title: "Promoções e Marketing",
    fields: [
      { type: "text", name: "q6", label: "Haverá a necessidade de criar e gerenciar cupons de desconto?" },
      { type: "textarea", name: "q7", label: "Quais tipos de promoções serão oferecidas (desconto percentual, frete grátis, compre 1 e leve 2)?" },
      { type: "textarea", name: "q8", label: "Como os clientes serão informados sobre as promoções?" },
      { type: "text", name: "q13", label: "Terá alguma configuração de descontos por quantidade?" },
      { type: "text", name: "q14", label: "Haverá restrições de uso para os cupons (data de validade, produtos específicos)?" },
    ],
  },
  {
    title: "Experiência de Compra",
    fields: [
      { type: "text", name: "q5", label: "Haverá um sistema de avaliações e comentários para produtos?" },
      { type: "text", name: "q10", label: "Como será a navegação por filtros (por preço, por marca, etc.)?" },
      { type: "text", name: "q11", label: "Haverá um limite de quantidade de produtos que um cliente pode adicionar ao carrinho?" },
      { type: "text", name: "q19", label: "O carrinho permitirá salvar produtos para compra futura?" },
      { type: "text", name: "q25", label: "Haverá uma seção de depoimentos ou avaliações de clientes?" },
      { type: "text", name: "q26", label: "Haverá uma seção de perguntas frequentes (FAQ)?" },
      { type: "text", name: "q38", label: "Haverá uma funcionalidade de carrinho abandonado com lembretes por e-mail?" },
    ],
  },
  {
    title: "Pagamento e Logística",
    fields: [
      { type: "textarea", name: "q4", label: "Quais são as políticas de retorno e troca para os produtos?" },
      { type: "text", name: "q15", label: "Quais métodos de pagamento serão aceitos (cartão de crédito, débito, PIX etc.)?" },
      { type: "text", name: "q16", label: "Haverá integração com qual plataforma de pagamento? (recomendamos o Pagar.me)" },
      { type: "text", name: "q17", label: "Quais as empresas de entregas serão integradas? (Correios, Transportadoras etc)" },
      { type: "text", name: "q18", label: "Quais serão as opções de entrega (frete, retirada na loja, entrega expressa)?" },
      { type: "textarea", name: "q20", label: "Quais serão as políticas de devolução e reembolso?" },
      { type: "text", name: "q30", label: "Quais são os prazos de devolução de produtos?" },
      { type: "text", name: "q32", label: "Se for o caso, quais transportadoras serão usadas?" },
      { type: "text", name: "q39", label: "As notas fiscais serão geradas automaticamente depois da entrega? Qual plataforma de geração?" },
    ],
  },
  {
    title: "Identidade Visual",
    fields: [
      { type: "text", name: "q23", label: "Quais cores e tema serão usados no site?" },
      { type: "text", name: "q24", label: "Há alguma referencia de algum concorrente para a homepage?" },
      { type: "text", name: "q29", label: "A marca está registrada no INPI?" },
    ],
  },
  {
    title: "Painel e ERP",
    fields: [
      { type: "text", name: "q21", label: "Haverá integração com sistemas de ERP ou CRM? Se sim, quais integrações?" },
      { type: "textarea", name: "q27", label: "No painel de controle, quais permissões de usuário e níveis de acesso serão necessários?" },
      { type: "textarea", name: "q28", label: "No painel de controle, quais tipos de relatórios serão necessários (vendas, estoque, desempenho)?" },
      { type: "text", name: "q31", label: "Haverá notificações automáticas de baixo estoque?" },
      { type: "textarea", name: "q40", label: "Como você quer que o estoque seja monitorado e atualizado? Tem algum sistema como referencia?" },
    ],
  },
  {
    title: "Dados e Conformidade",
    fields: [
      { type: "text", name: "q33", label: "Quais dados serão coletados no cadastro do cliente no site?" },
      { type: "text", name: "q34", label: "Haverá uma opção para os usuários excluírem suas contas e dados?" },
      { type: "text", name: "q35", label: "Será feito tráfego para o site? Se sim, quais canais?" },
      { type: "text", name: "q37", label: "Haverá integração com o Google Shopping?" },
    ],
  },
];

const TOTAL_STEPS = steps.length + 1; // +1 for confirmation step

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const BriefingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const isConfirmStep = currentStep === steps.length;
  const progress = isConfirmStep ? 100 : (currentStep / (TOTAL_STEPS - 1)) * 100;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateCurrentStep = () => {
    if (isConfirmStep) return true;
    const step = steps[currentStep];
    const newErrors: Record<string, boolean> = {};
    let valid = true;
    step.fields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = true;
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setDirection(1);
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      ...formData,
      timestamp: new Date().toLocaleString("pt-BR"),
    };
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao submeter. Por favor, tente novamente.", {
        className: "bg-brand-dark border-white/10 text-white",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-brand-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-medium text-white">Briefing enviado!</h2>
        <p className="text-white/60 text-lg">
          O seu briefing foi enviado com sucesso! Entraremos em contacto em breve.
        </p>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col pt-16 z-10 relative">
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-sm">
          Briefing E-commerce
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
          Questionário de <span className="text-brand-primary">Planejamento</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
          Preencha as informações abaixo para que possamos entender melhor as necessidades do seu projeto.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-xs text-white/40 font-medium">
          <span>
            Etapa {isConfirmStep ? TOTAL_STEPS : currentStep + 1} de {TOTAL_STEPS}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="rounded-[1.5rem] border border-white/5 bg-brand-dark p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full opacity-30 bg-noise mix-blend-overlay pointer-events-none" />

          {!isConfirmStep ? (
            <>
              <div className="relative flex items-center gap-4 pb-4 border-b border-white/10 z-10 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-bold">
                  {currentStep + 1}
                </span>
                <h2 className="text-xl font-medium tracking-tight text-white/90">
                  {currentStepData.title}
                </h2>
              </div>

              <div className="relative space-y-5 z-10">
                {currentStepData.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label htmlFor={field.name} className="block text-sm font-medium text-white/80">
                      {field.label}
                      {field.required && <span className="text-brand-primary ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        placeholder="Descreva sua resposta aqui..."
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={`min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20 resize-y transition-all hover:bg-white/10 ${
                          errors[field.name] ? "border-red-500" : ""
                        }`}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.type === "email" ? "email@empresa.com" : ""}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20 transition-all hover:bg-white/10 ${
                          errors[field.name] ? "border-red-500" : ""
                        }`}
                      />
                    )}
                    {errors[field.name] && (
                      <p className="text-red-400 text-xs">Este campo é obrigatório.</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="relative z-10 text-center py-8 space-y-5">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-brand-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-medium text-white">Pronto para finalizar?</h2>
              <p className="text-white/60">
                Revisamos todos os pontos principais do seu e-commerce. Clique no botão abaixo para
                submeter o seu briefing.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 mt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={goPrev}
          disabled={currentStep === 0}
          className={`gap-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full px-5 ${
            currentStep === 0 ? "invisible" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </Button>

        {!isConfirmStep ? (
          <Button
            type="button"
            onClick={goNext}
            className="gap-2 rounded-full px-8 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
          >
            Próximo <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="gap-2 rounded-full px-10 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> A enviar...
              </>
            ) : (
              "Finalizar e Enviar"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BriefingForm;