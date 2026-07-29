import { motion } from 'framer-motion';

const spaceImages = [
  {
    url: "/espaco-1.jpg",
    title: "Nossa Recepção"
  },
  {
    url: "/espaco-2.jpg",
    title: "Sala de Atendimento"
  },
  {
    url: "/espaco-3.jpg",
    title: "Vai um cafezinho?"
  }
];

interface SpaceGalleryProps {
  onOpenQuiz?: () => void;
}

export default function SpaceGallery({ onOpenQuiz }: SpaceGalleryProps) {
  return (
    <section className="py-24 bg-secondary-100 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4"
            >
              Nosso Espaço
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-serif font-bold text-neutral-900 mb-6"
            >
              Ambiente projetado para o seu conforto
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 leading-relaxed"
            >
              Da recepção em mármore iluminado aos consultórios equipados com a mais alta tecnologia, cada detalhe foi pensado para transmitir tranquilidade e segurança.
            </motion.p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {spaceImages.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-shadow"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent flex items-end">
                <h4 className="text-white font-serif font-bold text-2xl p-8">{img.title}</h4>
              </div>
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
            Quero agendar uma visita
          </motion.button>
        </div>
      </div>
    </section>
  );
}
