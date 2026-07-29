import { motion } from 'framer-motion';
import { Heart, Stethoscope, MapPin, Sparkles } from 'lucide-react';

export default function AboutClinic() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary-500" />,
      title: "Tecnologia de Ponta",
      description: "Radiografia e escaneamento digitais para diagnósticos precisos."
    },
    {
      icon: <Heart className="w-6 h-6 text-primary-500" />,
      title: "Atendimento Humanizado",
      description: "Cuidado centrado no paciente, sem traumas e com acolhimento."
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-primary-500" />,
      title: "Ambiente Acolhedor",
      description: "Consultório moderno projetado para o seu conforto absoluto."
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: "Localização Privilegiada",
      description: "No coração do Polo Médico do Nordeste, na Ilha do Leite."
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
          >
            Sobre Nosso Consultório
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-serif font-bold text-neutral-900 mb-6"
          >
            Sofisticação e cuidado em cada detalhe
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600 leading-relaxed"
          >
            A Perrier Dental Clinic foi idealizada para oferecer uma experiência odontológica premium. 
            Nosso espaço une um design elegante em mármore e tons quentes a uma infraestrutura tecnológica completa. 
            Acreditamos que ir ao dentista deve ser um momento de cuidado pessoal, livre de ansiedade e repleto de confiança.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary-50 p-8 rounded-2xl border border-secondary-100 hover:border-primary-200 transition-colors"
            >
              <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-neutral-900 mb-3">{feature.title}</h4>
              <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
