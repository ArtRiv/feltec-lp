"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import FormSection from "./FormSection";

const questions = [
  {
    section: "Produtos",
    items: [
      { id: 1, q: "Quais produtos serão vendidos na plataforma?", required: true },
      { id: 2, q: "Quantas e quais variações (cor, tamanho, modelo) cada produto terá?" },
      { id: 3, q: "Haverá produtos digitais, físicos ou ambos?" },
      { id: 4, q: "Quais são as políticas de retorno e troca para os produtos?" },
      { id: 5, q: "Haverá um sistema de avaliações e comentários para produtos?" },
      { id: 9, q: "Como os produtos serão categorizados? (tipos de produtos vendidos)" },
      { id: 12, q: 'Haverá uma opção de "customize seu produto"?' },
      { id: 22, q: "Quais categorias de produtos serão exibidas?" },
      { id: 36, q: 'Haverá categorias especiais como "Lançamentos" e "Mais Vendidos"?' },
    ],
  },
  {
    section: "Promoções e Cupons",
    items: [
      { id: 6, q: "Haverá a necessidade de criar e gerenciar cupons de desconto?" },
      { id: 7, q: "Quais tipos de promoções serão oferecidas (desconto percentual, frete grátis, compre 1 e leve 2)?" },
      { id: 8, q: "Como os clientes serão informados sobre as promoções?" },
      { id: 13, q: "Terá alguma configuração de descontos por quantidade?" },
      { id: 14, q: "Haverá restrições de uso para os cupons (data de validade, produtos específicos)?" },
    ],
  },
  {
    section: "Carrinho e Navegação",
    items: [
      { id: 10, q: "Como será a navegação por filtros (por preço, por marca, etc.)?" },
      { id: 11, q: "Haverá um limite de quantidade de produtos que um cliente pode adicionar ao carrinho?" },
      { id: 19, q: "O carrinho permitirá salvar produtos para compra futura?" },
      { id: 38, q: "Haverá uma funcionalidade de carrinho abandonado com lembretes por e-mail?" },
    ],
  },
  {
    section: "Pagamento e Entrega",
    items: [
      { id: 15, q: "Quais métodos de pagamento serão aceitos (cartão de crédito, débito, PIX etc.)?" },
      { id: 16, q: "Haverá integração com qual plataforma de pagamento? (recomendamos o Pagar.me)" },
      { id: 17, q: "Quais as empresas de entregas serão integradas? (Correios, Transportadoras etc)" },
      { id: 18, q: "Quais serão as opções de entrega (frete, retirada na loja, entrega expressa)?" },
      { id: 20, q: "Quais serão as políticas de devolução e reembolso?" },
      { id: 30, q: "Quais são os prazos de devolução de produtos?" },
      { id: 32, q: "Se for o caso, quais transportadoras serão usadas?" },
      { id: 39, q: "As notas fiscais serão geradas automaticamente depois da entrega? Qual plataforma de geração?" },
    ],
  },
  {
    section: "Design e Experiência",
    items: [
      { id: 23, q: "Quais cores e tema serão usados no site?" },
      { id: 24, q: "Há alguma referencia de algum concorrente para a homepage?" },
      { id: 25, q: "Haverá uma seção de depoimentos ou avaliações de clientes?" },
      { id: 26, q: "Haverá uma seção de perguntas frequentes (FAQ)?" },
    ],
  },
  {
    section: "Painel e Integrações",
    items: [
      { id: 21, q: "Haverá integração com sistemas de ERP ou CRM? Se sim, quais integrações?" },
      { id: 27, q: "No painel de controle, quais permissões de usuário e níveis de acesso serão necessários?" },
      { id: 28, q: "No painel de controle, quais tipos de relatórios serão necessários (vendas, estoque, desempenho)?" },
      { id: 31, q: "Haverá notificações automáticas de baixo estoque?" },
      { id: 37, q: "Haverá integração com o Google Shopping?" },
      { id: 40, q: "Como você quer que o estoque seja monitorado e atualizado? Tem algum sistema como referencia?" },
    ],
  },
  {
    section: "Dados e Conformidade",
    items: [
      { id: 29, q: "A marca está registrada no INPI?" },
      { id: 33, q: "Quais dados serão coletados no cadastro do cliente no site?" },
      { id: 34, q: "Haverá uma opção para os usuários excluírem suas contas e dados?" },
      { id: 35, q: "Será feito tráfego para o site? Se sim, quais?" },
    ],
  },
];

const BriefingForm = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q1 = answers[1]?.trim();
    if (!q1) {
      toast.error("Por favor, responda a pergunta obrigatória (Pergunta 1).", {
        className: "bg-[#161616] border-white/10 text-white",
      });
      return;
    }
    toast.success("Briefing enviado com sucesso!", {
      className: "bg-[#161616] border-[#F05B43] text-white",
    });
    console.log("Respostas:", answers);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col pt-16 z-10 relative">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-sm">
          Briefing E-commerce
        </div>
        <h1 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
          Questionário de <span className="text-[#F05B43]">Planejamento</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
          Preencha as informações abaixo para que possamos entender melhor as necessidades do seu projeto de e-commerce e entregar o melhor resultado.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        {questions.map((section, idx) => (
          <FormSection key={idx} title={section.section} index={idx + 1}>
            {section.items.map((item) => (
              <div key={item.id} className="space-y-3 group">
                <label htmlFor={`q-${item.id}`} className="block text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-200">
                  <span className="text-white/40 mr-2">{item.id}.</span>
                  {item.q}
                  {item.required && <span className="text-[#F05B43] ml-1.5">*</span>}
                </label>
                <Textarea
                  id={`q-${item.id}`}
                  placeholder="Descreva sua resposta aqui..."
                  value={answers[item.id] || ""}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-[#F05B43] focus-visible:ring-[#F05B43]/20 resize-y transition-all hover:bg-white/10"
                />
              </div>
            ))}
          </FormSection>
        ))}

        <div className="pt-8 flex justify-end">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full sm:w-auto px-10 h-12 rounded-full bg-[#F05B43] hover:bg-[#F05B43]/90 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(240,91,67,0.3)] hover:shadow-[0_0_30px_rgba(240,91,67,0.5)]"
          >
            Enviar Briefing
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BriefingForm;