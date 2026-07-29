import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a primeira consulta na Perrier Dental Clinic?",
    answer: "Nossa primeira consulta é uma verdadeira imersão na sua saúde bucal. Realizamos exames clínicos detalhados, fotografias e, se necessário, escaneamento digital e radiografias. Tudo para garantir um diagnóstico preciso e um plano de tratamento 100% personalizado."
  },
  {
    question: "Os procedimentos com implantes dentários são dolorosos?",
    answer: "Não. Na Perrier Dental Clinic utilizamos técnicas minimamente invasivas e anestésicos de ponta. Nossos pacientes relatam um pós-operatório muito tranquilo e confortável, e estamos sempre disponíveis para acompanhamento próximo."
  },
  {
    question: "Vocês trabalham com Invisalign (alinhadores invisíveis)?",
    answer: "Sim! Somos especialistas em ortodontia invisível. Utilizamos o escaneamento digital para planejar todo o seu tratamento em 3D, permitindo que você visualize o resultado antes mesmo de começar."
  },
  {
    question: "A clínica atende por planos de saúde (convênios)?",
    answer: "Para manter nosso padrão de excelência, tempo de atendimento estendido e materiais premium, não somos credenciados a planos de saúde. No entanto, fornecemos toda a documentação necessária para que você solicite o reembolso junto ao seu convênio."
  },
  {
    question: "Qual a durabilidade de uma Lente de Contato Dental?",
    answer: "Com os devidos cuidados de higiene e manutenções preventivas semestrais em consultório, as lentes em porcelana podem durar muitos anos, mantendo sua cor, brilho e resistência intactos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
          >
            Dúvidas Frequentes
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-neutral-900"
          >
            Tudo o que você precisa saber
          </motion.h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-secondary-100 rounded-2xl overflow-hidden bg-secondary-50 transition-colors hover:border-primary-200"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-serif font-bold text-lg text-neutral-900 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-primary-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
