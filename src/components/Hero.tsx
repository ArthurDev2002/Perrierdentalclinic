import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const WHATSAPP_LINK = "https://wa.me/558187928331";

interface HeroProps {
  onOpenQuiz?: () => void;
}

export default function Hero({ onOpenQuiz }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden rounded-b-[40px] lg:rounded-b-[80px] shadow-sm">
      {/* Background Image Area */}
      <div className="absolute inset-0 z-0">
        {/* Imagem para Desktop */}
        <img
          src="/hero-background.jpg"
          alt="Perrier Dental Clinic"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        {/* Imagem para Mobile */}
        <img
          src="/hero-background-mobile.jpg"
          alt="Perrier Dental Clinic"
          className="block md:hidden w-full h-full object-cover object-center"
        />
        {/* Gradiente claro para garantir a leitura do texto escuro (mais forte na esquerda, transparente na direita) */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-50/95 via-secondary-50/80 to-secondary-50/20 md:to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-2xl"
        >


          <h1 className="text-4xl lg:text-5xl font-semibold font-heading text-neutral-900 leading-tight">
            Você sabe que precisa ir ao dentista. A pergunta é: <span className="text-primary-600 italic font-heading font-semibold">até quando vai deixar para depois?</span>
          </h1>

          <p className="text-lg text-neutral-800 font-medium leading-relaxed max-w-lg">
            Diagnóstico completo, tratamento sem enrolação e resultado que você vê logo nas primeiras sessões.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onOpenQuiz}
              className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Agendar minha Consulta
            </button>
            <a
              href="#sobre"
              className="inline-flex justify-center items-center bg-white/80 backdrop-blur-sm border border-neutral-300 hover:border-primary-500 hover:text-primary-600 text-neutral-900 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-sm hover:bg-white"
            >
              Conhecer a Clínica
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
