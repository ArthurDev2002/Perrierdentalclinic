import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Thaina Soares",
    text: "Atendimento verdadeiramente humano e excepcional. O Dr. Rodrigo transmite muita confiança e explica cada detalhe com paciência. Recomendo de olhos fechados!",
    rating: 5
  },
  {
    name: "Sandra Moreira",
    text: "A clínica é linda e acolhedora. Fiz meus implantes e não senti dor alguma. A tecnologia que eles usam faz toda a diferença no resultado final.",
    rating: 5
  },
  {
    name: "Carlos Eduardo",
    text: "Profissionalismo do início ao fim. O ambiente tira aquela ansiedade clássica de ir ao dentista. Estou muito satisfeito com meu tratamento ortodôntico.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
            >
              Depoimentos
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-serif font-bold text-neutral-900"
            >
              Histórias reais de sorrisos transformados
            </motion.h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-secondary-50 px-6 py-4 rounded-2xl border border-secondary-100"
          >
            <div className="text-4xl font-bold text-neutral-900">4,9</div>
            <div>
              <div className="flex text-primary-500 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
              </div>
              <div className="text-sm text-neutral-600">Baseado em 138 avaliações no Google</div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary-50 p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-200/50" />
              <div className="flex text-primary-500 mb-6">
                {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              </div>
              <p className="text-neutral-700 leading-relaxed mb-8 relative z-10 italic">
                "{item.text}"
              </p>
              <div className="font-serif font-bold text-neutral-900 text-lg">
                {item.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
