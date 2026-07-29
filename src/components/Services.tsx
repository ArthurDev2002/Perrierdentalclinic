import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Smile, Sparkles, PlusCircle } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/558187928331";

const services = [
  {
    title: "Implante Dentário",
    description: "Recupere a função mastigatória e a estética do seu sorriso com raízes artificiais seguras e duradouras.",
    icon: <ShieldCheck className="w-8 h-8 text-primary-500" />
  },
  {
    title: "Prótese Fixa e Removível",
    description: "Reabilitação oral de excelência para devolver o conforto e a naturalidade ao mastigar e sorrir.",
    icon: <PlusCircle className="w-8 h-8 text-primary-500" />
  },
  {
    title: "Ortodontia",
    description: "Alinhamento dental com aparelhos convencionais ou alinhadores invisíveis (Invisalign) para máxima discrição.",
    icon: <UserCheck className="w-8 h-8 text-primary-500" />
  },
  {
    title: "Clareamento Dental",
    description: "Técnicas avançadas e seguras para um sorriso mais branco e iluminado em poucas sessões.",
    icon: <Sparkles className="w-8 h-8 text-primary-500" />
  },
  {
    title: "Restaurações Estéticas",
    description: "Reparos imperceptíveis usando resinas de alta tecnologia que imitam a cor e textura naturais do dente.",
    icon: <Smile className="w-8 h-8 text-primary-500" />
  },
  {
    title: "Facetas de Porcelana e Lentes",
    description: "Lâminas ultrafinas de porcelana para transformar formato, cor e alinhamento do sorriso de forma definitiva.",
    icon: <Sparkles className="w-8 h-8 text-primary-500" />
  }
];

interface ServicesProps {
  onOpenQuiz?: () => void;
}

export default function Services({ onOpenQuiz }: ServicesProps) {
  return (
    <section id="tratamentos" className="py-24 bg-secondary-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
          >
            Tratamentos e Especialidades
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-neutral-900 mb-6"
          >
            Soluções completas para o seu sorriso
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow group"
            >
              <div className="mb-6 bg-secondary-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-2xl font-serif font-bold text-neutral-900 mb-3">{service.title}</h4>
              <p className="text-neutral-600 leading-relaxed mb-6">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            onClick={onOpenQuiz}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:-translate-y-1"
          >
            Agendar Avaliação Específica
          </motion.button>
        </div>
      </div>
    </section>
  );
}
