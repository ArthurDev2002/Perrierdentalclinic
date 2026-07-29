import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Send } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "558187928331";

const TREATMENTS = [
  "Implante Dentário",
  "Prótese Fixa e Removível",
  "Ortodontia",
  "Clareamento Dental",
  "Restaurações Estéticas",
  "Facetas de Porcelana e Lentes",
  "Ainda não sei, quero uma avaliação geral"
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    treatment: '',
    isPatient: '',
    bestTime: ''
  });

  // Reseta o estado quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setFormData({ name: '', treatment: '', isPatient: '', bestTime: '' });
      }, 300); // Espera a animação de saída terminar
    }
  }, [isOpen]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));

  const handleClose = () => {
    onClose();
  };

  const handleSendWhatsApp = () => {
    // Capitalize the first letter of each word in the name
    const formattedName = formData.name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const text = `Olá! Me chamo *${formattedName}* e gostaria de agendar uma consulta na Perrier Dental Clinic.

- Tratamento de interesse: ${formData.treatment}
- Já sou paciente: ${formData.isPatient}
- Melhor horário de atendimento: ${formData.bestTime}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay escuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header Fixo */}
            <div className="bg-secondary-50 border-b border-neutral-100 p-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 bg-white rounded-full shadow-sm hover:shadow transition-all"
              >
                <X size={20} />
              </button>

              <h3 className="font-heading font-semibold text-2xl text-neutral-900 mb-2 pr-8">
                Vamos agendar sua consulta
              </h3>
              <p className="text-sm text-neutral-600 font-body leading-relaxed">
                Antes de falar com a gente, responda algumas perguntas rápidas — leva menos de 1 minuto.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-6 overflow-hidden">
                <motion.div
                  className="h-full bg-primary-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Conteúdo Dinâmico com Scroll se necessário */}
            <div className="p-6 overflow-y-auto flex-1 min-h-[300px]">
              <AnimatePresence mode="wait">

                {/* ETAPA 1: NOME */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <label className="block text-lg font-medium text-neutral-800 font-body">
                      Antes de tudo, qual seu nome?
                    </label>
                    <input
                      type="text"
                      autoFocus
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Digite seu nome ou como gosta de ser chamado(a)..."
                      className="w-full px-4 py-4 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg font-body"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formData.name.trim()) handleNext();
                      }}
                    />
                    <button
                      onClick={handleNext}
                      disabled={!formData.name.trim()}
                      className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-400 text-white py-4 rounded-xl font-medium text-lg transition-all"
                    >
                      Continuar
                    </button>
                  </motion.div>
                )}

                {/* ETAPA 2: TRATAMENTO */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 h-full flex flex-col"
                  >
                    <label className="block text-lg font-medium text-neutral-800 font-body">
                      <span className="font-bold text-primary-600">{formData.name}</span>, qual tratamento você está buscando?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                      {TREATMENTS.map((treat) => (
                        <button
                          key={treat}
                          onClick={() => {
                            setFormData({ ...formData, treatment: treat });
                            setTimeout(handleNext, 150);
                          }}
                          className={`text-left p-4 rounded-xl border transition-all font-body text-sm ${formData.treatment === treat
                              ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-medium'
                              : 'border-neutral-200 hover:border-primary-300 text-neutral-700 hover:bg-neutral-50'
                            }`}
                        >
                          {treat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 3: JÁ É PACIENTE? */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <label className="block text-lg font-medium text-neutral-800 font-body">
                      <span className="font-bold text-primary-600">{formData.name}</span>, você já é paciente da Perrier Dental Clinic?
                    </label>
                    <div className="flex flex-col gap-3">
                      {['Sim, já sou paciente', 'Não, seria minha primeira vez'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFormData({ ...formData, isPatient: opt });
                            setTimeout(handleNext, 150);
                          }}
                          className={`text-left p-4 rounded-xl border transition-all font-body text-base ${formData.isPatient === opt
                              ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-medium'
                              : 'border-neutral-200 hover:border-primary-300 text-neutral-700 hover:bg-neutral-50'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 4: MELHOR HORÁRIO */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <label className="block text-lg font-medium text-neutral-800 font-body">
                      Para fecharmos, <span className="font-bold text-primary-600">{formData.name}</span>, qual o melhor horário pra te chamarmos no WhatsApp?
                    </label>
                    <div className="flex flex-col gap-3">
                      {['Manhã (08h - 12h)', 'Tarde (13h - 18h)', 'Qualquer horário'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setFormData({ ...formData, bestTime: opt });
                            setTimeout(handleNext, 150);
                          }}
                          className={`text-left p-4 rounded-xl border transition-all font-body text-base ${formData.bestTime === opt
                              ? 'border-primary-500 bg-primary-50/50 text-primary-700 font-medium'
                              : 'border-neutral-200 hover:border-primary-300 text-neutral-700 hover:bg-neutral-50'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 5: RESUMO E CTA */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 flex flex-col items-center text-center py-4"
                  >
                    <div className="w-16 h-16 bg-[#c5a017]/10 text-[#c5a017] rounded-full flex items-center justify-center mb-2">
                      <Send size={32} className="ml-1" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-heading font-semibold text-neutral-900 mb-2">
                        Prontinho, {formData.name}!
                      </h4>
                      <p className="text-neutral-600 font-body">
                        É só confirmar pelo WhatsApp que nossa equipe já te atende.
                      </p>
                    </div>

                    <div className="w-full bg-secondary-50 border border-neutral-100 rounded-xl p-4 text-left space-y-3 my-4">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Tratamento</span>
                        <span className="text-sm font-medium text-neutral-800">{formData.treatment}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Status</span>
                        <span className="text-sm font-medium text-neutral-800">{formData.isPatient}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Contato</span>
                        <span className="text-sm font-medium text-neutral-800">{formData.bestTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full bg-[#c5a017] hover:bg-[#b39014] text-white py-4 rounded-xl font-medium text-lg transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      Falar com a Clínica agora
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Rodapé com botão Voltar */}
            {step > 1 && step < 5 && (
              <div className="bg-white border-t border-neutral-100 p-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Voltar para anterior
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
