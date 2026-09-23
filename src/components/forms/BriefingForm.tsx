'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, ArrowRight, ArrowLeft, Check, 
  Send, Printer, MessageCircle, Copy, 
  CheckCircle, AlertCircle 
} from 'lucide-react';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySk7fpkIbEAo27ALRgPkv412hIbrhhv_X6y9Gx-M0LGLolmdGQ55TZvaEEDOqYILL6/exec';

export default function BriefingForm() {
  const totalSteps = 7;
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    client_company: '',
    client_name: '',
    client_contact: '',
    q1_stage: '',
    q1_orders: '',
    q1_manager: '',
    q2_skus: '',
    q2_variations: '',
    q2_special: '',
    q2_special_details: '',
    q2_erp: '',
    q2_erp_details: '',
    q3_origin: '',
    q3_freight: [] as string[],
    q3_pickup: '',
    q3_pickup_details: '',
    q4_checkout: '',
    q4_installments: '',
    q5_brand: '',
    q5_references: '',
    q5_assets: '',
    q6_strategy: '',
    q6_marketing_tools: ''
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const list = prev[name as keyof typeof prev] as string[];
      if (checked) {
        return { ...prev, [name]: [...list, value] };
      } else {
        return { ...prev, [name]: list.filter(item => item !== value) };
      }
    });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.client_company || !formData.client_name) {
        showToast('Por favor, informe Empresa e Responsável para avançar.', 'error');
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Progress Calculation
  const requiredGroups = [
    'q1_stage', 'q1_orders', 'q2_skus', 'q2_variations', 'q2_special', 
    'q2_erp', 'q3_origin', 'q3_pickup', 'q4_checkout', 'q4_installments', 
    'q5_brand', 'q5_assets', 'q6_strategy', 'q6_marketing_tools'
  ];

  const calculateProgress = () => {
    let answered = 0;
    requiredGroups.forEach(group => {
      if (formData[group as keyof typeof formData]) answered++;
    });
    if (formData.q3_freight.length > 0) answered++;
    if (formData.client_company.trim() !== '') answered++;
    if (formData.client_name.trim() !== '') answered++;

    const totalRequired = requiredGroups.length + 3;
    return Math.round((answered / totalRequired) * 100);
  };

  const progress = Math.min(calculateProgress(), 100);

  const getSummaryText = () => {
    const getVal = (val: string | string[]) => {
      if (Array.isArray(val)) return val.length > 0 ? val.join('; ') : 'Nenhum selecionado';
      return val && val.trim() !== '' ? val.trim() : 'Não informado/N/A';
    };

    return `📌 *BRIEFING GERAL & ALINHAMENTO - FELTEC*
🏢 Empresa: ${getVal(formData.client_company)}
👤 Responsável: ${getVal(formData.client_name)}
📱 Contato: ${getVal(formData.client_contact)}

*1. MOMENTO DO NEGÓCIO*
• Estágio: ${getVal(formData.q1_stage)}
• Volume: ${getVal(formData.q1_orders)}
• Gestor: ${getVal(formData.q1_manager)}

*2. CATÁLOGO*
• SKUs: ${getVal(formData.q2_skus)}
• Variações: ${getVal(formData.q2_variations)}
• Campos Técnicos: ${getVal(formData.q2_special)} (${getVal(formData.q2_special_details)})
• ERP: ${getVal(formData.q2_erp)} (${getVal(formData.q2_erp_details)})

*3. LOGÍSTICA*
• Origem: ${getVal(formData.q3_origin)}
• Fretes: ${getVal(formData.q3_freight)}
• Retire na Loja: ${getVal(formData.q3_pickup)} (${getVal(formData.q3_pickup_details)})

*4. PAGAMENTO*
• Checkout: ${getVal(formData.q4_checkout)}
• Parcelamento: ${getVal(formData.q4_installments)}

*5. DESIGN*
• Identidade: ${getVal(formData.q5_brand)}
• Material Gráfico: ${getVal(formData.q5_assets)}
• Refs: ${getVal(formData.q5_references)}

*6. MARKETING*
• Estratégia: ${getVal(formData.q6_strategy)}
• Ferramentas no Lançamento: ${getVal(formData.q6_marketing_tools)}
---------------------------
Gerado via Sistema Feltec`;
  };

  const shareWhatsApp = () => {
    const summary = getSummaryText();
    const encoded = encodeURIComponent(summary);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const copySummary = () => {
    const summary = getSummaryText();
    navigator.clipboard.writeText(summary).then(() => {
      showToast('Resumo do briefing copiado com sucesso!', 'success');
    }).catch(err => {
      console.error(err);
      showToast('Erro ao copiar. Tente novamente.', 'error');
    });
  };

  const submitToGoogleSheet = async () => {
    if (!formData.client_company || !formData.client_name) {
      showToast('Preencha Empresa e Nome do Responsável (Passo 1).', 'error');
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      // Mapeamento exato das chaves que o seu Google Apps Script espera
      const payload = {
        company: formData.client_company,
        name: formData.client_name,
        contact: formData.client_contact,
        q1_stage: formData.q1_stage,
        q1_orders: formData.q1_orders,
        q1_manager: formData.q1_manager,
        q2_skus: formData.q2_skus,
        q2_variations: formData.q2_variations,
        q2_special: formData.q2_special,
        q2_special_details: formData.q2_special_details,
        q2_erp: formData.q2_erp,
        q2_erp_details: formData.q2_erp_details,
        q3_origin: formData.q3_origin,
        q3_freight: formData.q3_freight.join('; '),
        q3_pickup: formData.q3_pickup,
        q3_pickup_details: formData.q3_pickup_details,
        q4_checkout: formData.q4_checkout,
        q4_installments: formData.q4_installments,
        q5_brand: formData.q5_brand,
        q5_references: formData.q5_references,
        q5_assets: formData.q5_assets,
        q6_strategy: formData.q6_strategy,
        q6_marketing_tools: formData.q6_marketing_tools,
        data_local: new Date().toLocaleString('pt-BR') // Envia a hora exata do usuário
      };

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      showToast('Briefing enviado com sucesso!', 'success');
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      showToast('Erro de conexão ao enviar para a planilha.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Helper Components for Interactive Options
  const RadioOption = ({ name, value, label }: { name: string, value: string, label: string }) => {
    const isSelected = formData[name as keyof typeof formData] === value;
    return (
      <label className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-[#f2614b] bg-[#f2614b]/10 shadow-[0_0_15px_rgba(242,97,75,0.12)]' 
          : 'border-white/5 bg-[#141414]/90 hover:-translate-y-[2px] hover:border-[#f2614b]/40 hover:bg-[#1e1e1e]/95'
      }`}>
        <input type="radio" name={name} value={value} checked={isSelected} onChange={handleInputChange} className="hidden" />
        <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected ? 'border-[#f2614b]' : 'border-gray-600'
        }`}>
          <div className={`w-2 h-2 rounded-full bg-[#f2614b] transition-all ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
        </div>
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </label>
    );
  };

  const CheckboxOption = ({ name, value, label }: { name: string, value: string, label: string }) => {
    const isSelected = (formData[name as keyof typeof formData] as string[]).includes(value);
    return (
      <label className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-[#f2614b] bg-[#f2614b]/10 shadow-[0_0_15px_rgba(242,97,75,0.12)]' 
          : 'border-white/5 bg-[#141414]/90 hover:-translate-y-[2px] hover:border-[#f2614b]/40 hover:bg-[#1e1e1e]/95'
      }`}>
        <input type="checkbox" name={name} value={value} checked={isSelected} onChange={handleCheckboxChange} className="hidden" />
        <div className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected ? 'border-[#f2614b] bg-[#f2614b]' : 'border-gray-600'
        }`}>
          <Check className={`w-3 h-3 text-[#1a1a1a] transition-all ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} strokeWidth={4} />
        </div>
        <span className="text-sm font-medium text-slate-300">{label}</span>
      </label>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 font-sans">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2614b]/10 border border-[#f2614b]/30 text-[#f2614b] text-xs font-semibold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(242,97,75,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#f2614b] animate-pulse"></span>
          Feltec • Sistemas & Arquitetura Digital
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-4 pb-1">
          Questionário de Briefing Geral
        </h1>
        <p className="text-slate-300 text-base sm:text-lg font-medium tracking-wide mb-3">
          Alinhamento Estratégico para E-commerce & Plataformas Digitais
        </p>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Responda as questões abaixo para mapearmos o escopo técnico, integrações de ERP, checkout, logística e experiência de compra do seu projeto.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="no-print sticky top-4 z-50 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-8 shadow-xl flex items-center gap-4">
        <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Progresso</div>
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#f2614b] rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(242,97,75,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm font-bold text-[#f2614b] w-12 text-right">{progress}%</div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Building2 className="w-24 h-24" />
              </div>
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/10 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono shadow-[0_0_15px_rgba(242,97,75,0.15)]">
                  01
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-wide">Identificação</h2>
                  <p className="text-xs text-slate-400">Dados básicos da empresa e do responsável</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nome da Empresa / Marca</label>
                  <input type="text" name="client_company" value={formData.client_company} onChange={handleInputChange} placeholder="Ex: Acqua Brasil" className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nome do Responsável</label>
                  <input type="text" name="client_name" value={formData.client_name} onChange={handleInputChange} placeholder="Ex: Carlos Silva" className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">WhatsApp / Contato</label>
                  <input type="text" name="client_contact" value={formData.client_contact} onChange={handleInputChange} placeholder="(48) 99999-9999" className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">02</div>
                <h2 className="text-xl font-bold text-white">Momento do Negócio & Escala</h2>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Qual opção melhor descreve o estágio da sua empresa hoje?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q1_stage" value="Validação / Começando do zero no digital" label="Validação / Começando do zero no digital." />
                  <RadioOption name="q1_stage" value="Operação ativa em canais manuais (redes sociais, WhatsApp, loja física) buscando formalização" label="Operação ativa em canais manuais (redes sociais, WhatsApp, loja física) buscando formalização." />
                  <RadioOption name="q1_stage" value="Operação ativa em marketplaces criando canal próprio" label="Operação ativa em marketplaces (Mercado Livre, Shopee, Amazon) criando canal próprio." />
                  <RadioOption name="q1_stage" value="E-commerce já em operação, buscando migração ou reconstrução de plataforma" label="E-commerce já em operação, buscando migração ou reconstrução de plataforma." />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Qual é a média de pedidos/vendas que a empresa processa no total atualmente?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption name="q1_orders" value="Ainda não iniciamos as vendas" label="Ainda não iniciamos as vendas." />
                  <RadioOption name="q1_orders" value="Até 5 pedidos por dia (até ~150/mês)" label="Até 5 pedidos por dia (até ~150/mês)." />
                  <RadioOption name="q1_orders" value="De 6 a 30 pedidos por dia (~150 a 900/mês)" label="De 6 a 30 pedidos por dia (~150 a 900/mês)." />
                  <RadioOption name="q1_orders" value="Mais de 30 pedidos por dia (+1.000/mês)" label="Mais de 30 pedidos por dia (+1.000/mês)." />
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Quem será o responsável direto na sua equipe por atualizar produtos, fotos e gerenciar pedidos após a entrega?</p>
                <input type="text" name="q1_manager" value={formData.q1_manager} onChange={handleInputChange} placeholder="Informe o nome, cargo e nível de conhecimento técnico..." className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm" />
              </div>
            </section>
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">03</div>
                <h2 className="text-xl font-bold text-white">Catálogo & Estrutura de Produtos</h2>
              </div>

              <div className="mb-8">
                <div className="mb-4">
                  <p className="text-base font-semibold text-slate-200">Quantos produtos (SKUs) ativos vocês pretendem colocar no ar no lançamento?</p>
                  <p className="text-xs text-slate-400 mt-1">(O escopo base cobre a parametrização inicial de 15 a 20 itens; volumes maiores entram como serviço adicional ou cadastro próprio).</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioOption name="q2_skus" value="Até 20 SKUs" label="Até 20 SKUs" />
                  <RadioOption name="q2_skus" value="De 21 a 100 SKUs" label="De 21 a 100 SKUs" />
                  <RadioOption name="q2_skus" value="Acima de 100 SKUs" label="Acima de 100 SKUs" />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Como é a estrutura de variação desses itens?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q2_variations" value="Produtos simples (sem variação de cor, tamanho ou modelo)" label="Produtos simples (sem variação de cor, tamanho ou modelo)." />
                  <RadioOption name="q2_variations" value="Com variações padrão (tamanho P/M/G, cores, voltagem 110v/220v)" label="Com variações padrão (tamanho P/M/G, cores, voltagem 110v/220v)." />
                  <RadioOption name="q2_variations" value="Produtos com regras complexas (itens sob encomenda, kits dinâmicos, campos para anexar arquivos)" label="Produtos com regras complexas (itens sob encomenda, kits dinâmicos, campos para anexar arquivos)." />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">A página de produto exigirá campos técnicos especiais?</p>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <RadioOption name="q2_special" value="Não, apenas descrição padrão e fotos" label="Não, apenas descrição padrão e fotos." />
                  <RadioOption name="q2_special" value="Sim" label="Sim." />
                </div>
                {formData.q2_special === 'Sim' && (
                  <input type="text" name="q2_special_details" value={formData.q2_special_details} onChange={handleInputChange} placeholder="Especifique: tabela de medidas, manual em PDF, personalização..." className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm mt-2" />
                )}
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Como é feita a gestão de estoque e emissão de nota fiscal atualmente?</p>
                <div className="grid grid-cols-1 gap-3 mb-3">
                  <RadioOption name="q2_erp" value="Manual (planilhas / controle próprio interno)" label="Manual (planilhas / controle próprio interno)." />
                  <RadioOption name="q2_erp" value="Sistema ERP ativo" label="Sistema ERP ativo (Bling, Tiny, Omie, ERPNext, Totvs)." />
                  <RadioOption name="q2_erp" value="Não temos sistema e gostaríamos de avaliar a contratação e integração de um ERP" label="Não temos sistema e gostaríamos de avaliar a contratação e integração de um ERP." />
                </div>
                {formData.q2_erp === 'Sistema ERP ativo' && (
                  <input type="text" name="q2_erp_details" value={formData.q2_erp_details} onChange={handleInputChange} placeholder="Informe qual o sistema atual..." className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm mt-2" />
                )}
              </div>
            </section>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">04</div>
                <h2 className="text-xl font-bold text-white">Logística & Despacho</h2>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">De onde sairão as mercadorias?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption name="q3_origin" value="Único ponto de despacho" label="Único ponto de despacho (um endereço físico, galpão ou escritório)." />
                  <RadioOption name="q3_origin" value="Múltiplos pontos" label="Múltiplos pontos (mais de uma loja física, CDs distintos ou fornecedores)." />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Quais serviços de frete vocês pretendem disponibilizar? <span className="text-slate-400 font-normal text-sm ml-2">(Múltipla escolha)</span></p>
                <div className="grid grid-cols-1 gap-3">
                  <CheckboxOption name="q3_freight" value="Integrador padrão de frete" label="Integrador padrão de frete (Melhor Envio / Frenet / Correios)." />
                  <CheckboxOption name="q3_freight" value="Tabela fixa / Entrega própria" label="Tabela fixa / Entrega própria (ex: motoboy local com valor fixo por cidade/bairro)." />
                  <CheckboxOption name="q3_freight" value="Regras avançadas e múltiplas transportadoras" label="Regras avançadas (múltiplas transportadoras com contratos próprios, tabelas de frete pesadas ou frete grátis segmentado)." />
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Pretendem disponibilizar a modalidade de "Compre no site e retire na loja física"?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <RadioOption name="q3_pickup" value="Não" label="Não." />
                  <RadioOption name="q3_pickup" value="Sim" label="Sim." />
                </div>
                {formData.q3_pickup === 'Sim' && (
                  <input type="text" name="q3_pickup_details" value={formData.q3_pickup_details} onChange={handleInputChange} placeholder="Se sim, informar quantidade e locais de retirada..." className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm mt-2" />
                )}
              </div>
            </section>
          </div>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">05</div>
                <h2 className="text-xl font-bold text-white">Pagamentos & Checkout</h2>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Qual modelo de checkout atende a necessidade da loja?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q4_checkout" value="Venda assistida / WhatsApp" label="Venda assistida / Catálogo online com fechamento de pedido via WhatsApp." />
                  <RadioOption name="q4_checkout" value="Checkout transparente 1 intermediador" label="Checkout transparente automático com 1 intermediador padrão (Pix e Cartão via Mercado Pago, Stripe ou Pagar.me)." />
                  <RadioOption name="q4_checkout" value="Arquitetura com múltiplos intermediadores ou split" label="Arquitetura com múltiplos intermediadores (redundância) ou divisão de recebíveis (split de pagamentos entre parceiros)." />
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Como pretendem trabalhar as parcelas no cartão de crédito?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q4_installments" value="Parcelamento sem juros assumido pela loja" label="Parcelamento sem juros assumido pela loja até X parcelas." />
                  <RadioOption name="q4_installments" value="Repasse dos juros para o comprador" label="Repasse dos juros e taxas diretamente para o comprador a partir da primeira parcela." />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 6 */}
        {currentStep === 6 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">06</div>
                <h2 className="text-xl font-bold text-white">Design, Identidade Visual & Conteúdo</h2>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Vocês já possuem identidade visual estabelecida?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q5_brand" value="Sim, logotipo e paleta definidos" label="Sim, possuímos logotipo em vetor/PNG transparente, paleta de cores e tipografia definidos." />
                  <RadioOption name="q5_brand" value="Logo básico, precisa de apoio" label="Temos apenas um logo básico e precisamos de apoio para definir cores e layout." />
                  <RadioOption name="q5_brand" value="Não temos nada (criar do zero)" label="Não temos nada e precisaremos da criação da marca do zero (orçado à parte)." />
                </div>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Indique 2 a 3 links de e-commerces que servem de referência visual ou de navegabilidade:</p>
                <textarea name="q5_references" value={formData.q5_references} onChange={handleInputChange} rows={3} placeholder="Cole os links e o que mais lhe agrada em cada um..." className="w-full bg-[#141414]/90 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#f2614b] focus:ring-1 focus:ring-[#f2614b] transition text-sm"></textarea>
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Como será o fornecimento do material gráfico para a montagem do site?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q5_assets" value="Cliente enviará banners e fotos" label="A nossa empresa enviará banners, imagens tratadas e textos prontos." />
                  <RadioOption name="q5_assets" value="Agência desenvolve banners e trata fotos" label="Precisaremos que a agência desenvolva os banners institucionais e faça o tratamento das fotos." />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 7 */}
        {currentStep === 7 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="bg-[#1e1e1e]/75 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#f2614b]/20 border border-[#f2614b]/40 flex items-center justify-center text-[#f2614b] font-bold text-lg font-mono">07</div>
                <h2 className="text-xl font-bold text-white">Ferramentas de Marketing & Tráfego</h2>
              </div>

              <div className="mb-8">
                <p className="text-base font-semibold text-slate-200 mb-4">Como será a estratégia de atração de clientes para a loja após o lançamento?</p>
                <div className="grid grid-cols-1 gap-3">
                  <RadioOption name="q6_strategy" value="Já temos agência / gestor de tráfego pago interno e verba de anúncios pronta para rodar" label="Já temos agência / gestor de tráfego pago interno e verba de anúncios pronta para rodar." />
                  <RadioOption name="q6_strategy" value="Faremos divulgação própria inicial (redes sociais orgânicas, base de contatos, WhatsApp)" label="Faremos divulgação própria inicial (redes sociais orgânicas, base de contatos, WhatsApp)." />
                  <RadioOption name="q6_strategy" value="Ainda não planejamos essa etapa de divulgação/anúncios" label="Ainda não planejamos essa etapa de divulgação/anúncios." />
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-slate-200 mb-4">Vocês precisarão de ferramentas de marketing integradas logo no lançamento?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <RadioOption name="q6_marketing_tools" value="Sim" label="Sim." />
                  <RadioOption name="q6_marketing_tools" value="Não" label="Não." />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 mb-12">
          <div className="w-full sm:w-auto">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Passo Anterior
              </button>
            )}
          </div>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 justify-end flex-1">
            {currentStep < totalSteps && (
              <button type="button" onClick={nextStep} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#f2614b] text-white font-bold text-sm hover:bg-[#f57a66] transition-all shadow-[0_0_15px_rgba(242,97,75,0.15)] flex items-center justify-center gap-2 ml-auto">
                Próximo Passo <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === totalSteps && (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto ml-auto">
                {isSubmitted && (
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in duration-300">
                    <button type="button" onClick={() => window.print()} className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <Printer className="w-4 h-4" /> Imprimir
                    </button>
                    <button type="button" onClick={shareWhatsApp} className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                    <button type="button" onClick={copySummary} className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" /> Copiar
                    </button>
                  </div>
                )}

                <button type="button" onClick={submitToGoogleSheet} disabled={isSubmitting} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#f2614b] text-white font-bold text-sm hover:bg-[#f57a66] hover:-translate-y-0.5 transition-all shadow-[0_0_15px_rgba(242,97,75,0.15)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none">
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Enviando...' : 'Enviar Briefing'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>

      <footer className="no-print text-center text-slate-500 text-xs pb-10 border-t border-white/5 pt-6">
        &copy; 2026 Feltec. Todos os direitos reservados.<br/>
        Soluções em Sistemas ERP & Arquitetura Digital de Próxima Geração.
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[1000] animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="bg-[#101622]/95 border border-[#1f293d] backdrop-blur-md text-white px-5 py-4 rounded-xl flex items-center gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-[#f2614b]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Estilos específicos para impressão (mantidos do original) */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: #ffffff !important; color: #000000 !important; }
          .no-print { display: none !important; }
          .animate-in { animation: none !important; opacity: 1 !important; transform: none !important; display: block !important; }
          .bg-\\[\\#1e1e1e\\]\\/75 { background: #ffffff !important; border: 1px solid #cccccc !important; color: #000000 !important; box-shadow: none !important; margin-bottom: 1rem; }
          .text-white, .text-slate-200, .text-slate-300, .text-slate-400 { color: #000 !important; }
          .text-\\[\\#f2614b\\] { color: #000 !important; }
          label { background: #fff !important; border: 1px solid #ccc !important; }
          input[type="text"], textarea { background: #fff !important; border: 1px solid #999 !important; color: #000 !important; }
        }
      `}} />
    </div>
  );
}
