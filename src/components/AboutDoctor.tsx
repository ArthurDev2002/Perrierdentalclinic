import { motion } from 'framer-motion';

interface AboutDoctorProps {
  onOpenQuiz?: () => void;
}

export default function AboutDoctor({ onOpenQuiz }: AboutDoctorProps) {
  return (
    <section id="doutor" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Títulos Mobile (Exibidos antes da foto no celular) */}
          <div className="md:hidden space-y-2 order-1 text-center md:text-left mb-2">
            <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase">Sobre o Diretor Clínico</h2>
            <h3 className="text-4xl font-heading font-semibold text-neutral-900">Dr. Rodrigo Perrier</h3>
          </div>

          {/* Foto do Doutor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[450px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl order-2"
          >
            {/* Placeholder para foto do Dr. Rodrigo Perrier */}
            <div className="absolute inset-0 bg-neutral-200">
              <img
                src="/foto-dr-rodrigo.jpg"
                alt="Dr. Rodrigo Perrier"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Conteúdo de Texto e Botão */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-3"
          >
            {/* Títulos Desktop (Exibidos dentro do grid no computador) */}
            <div className="hidden md:block space-y-2">
              <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase">Sobre o Diretor Clínico</h2>
              <h3 className="text-4xl font-heading font-semibold text-neutral-900">Dr. Rodrigo Perrier</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="bg-secondary-100 text-neutral-800 px-4 py-1.5 rounded-full text-sm font-medium">Implantodontia</span>
              <span className="bg-secondary-100 text-neutral-800 px-4 py-1.5 rounded-full text-sm font-medium">Prótese Dentária</span>
              <span className="bg-secondary-100 text-neutral-800 px-4 py-1.5 rounded-full text-sm font-medium">Reabilitação Oral</span>
            </div>

            <div className="space-y-4 text-lg text-neutral-600 leading-relaxed pt-4">
              <p>
                Todo paciente que chega aqui já carrega alguma coisa: vergonha de sorrir, medo de cadeira de dentista, uma história de tratamento que não deu certo. Foi entendendo isso que decidi me especializar em Implantodontia e Reabilitação Oral, porque é onde a odontologia realmente muda a vida de alguém
              </p>
              <p>
                Isso muda completamente a forma como eu conduzo uma consulta: não começo falando de procedimento, começo entendendo o que te trouxe até aqui.
              </p>
              <p>
                Na Perrier Dental Clinic, cada plano de tratamento é pensado do zero. Sem fórmula pronta, sem paciente número tal. Você senta, eu escuto, e a partir daí a gente decide juntos o caminho.
              </p>
            </div>

            <div className="pt-6 text-center md:text-left">
              <button
                onClick={onOpenQuiz}
                className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
              >
                Agendar Consulta com Dr. Rodrigo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
