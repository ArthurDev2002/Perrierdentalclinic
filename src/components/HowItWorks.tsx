import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Agende pelo WhatsApp",
    description: "Entre em contato com nossa equipe de atendimento para escolher o melhor horário para você."
  },
  {
    number: "02",
    title: "Avaliação Inicial",
    description: "Realizamos exames de imagem digitais e uma conversa franca sobre seus objetivos."
  },
  {
    number: "03",
    title: "Plano Personalizado",
    description: "Apresentamos o planejamento do seu tratamento, com transparência em cada etapa e valor."
  },
  {
    number: "04",
    title: "Tratamento e Sorriso",
    description: "Execução do procedimento com conforto absoluto e acompanhamento próximo dos resultados."
  }
];

interface HowItWorksProps {
  onOpenQuiz?: () => void;
}

export default function HowItWorks({ onOpenQuiz }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="py-24 bg-secondary-100 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
          >
            Como Funciona
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-neutral-900 mb-6"
          >
            Sua jornada para o sorriso ideal
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Linha conectora (visível apenas em desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-primary-200 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-secondary-100 mb-6 relative">
                <span className="text-3xl font-serif font-bold text-primary-500">{step.number}</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-neutral-900 mb-3">{step.title}</h4>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.button 
            onClick={onOpenQuiz}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:-translate-y-1"
          >
            Começar Agora (WhatsApp)
          </motion.button>
        </div>
      </div>
    </section>
  );
}
