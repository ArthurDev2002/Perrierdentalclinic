import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4">Contato e Localização</h2>
              <h3 className="text-4xl font-serif font-bold text-neutral-900">Visite nosso consultório</h3>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-secondary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-neutral-900 mb-2">Endereço</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Rua Senador José Henrique, 231<br />
                    Empresarial Charles Darwin, sala 1307<br />
                    Ilha do Leite, Recife - PE, 50070-460
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-secondary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-neutral-900 mb-2">Telefone</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    (81) 8792-8331
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-secondary-50 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-neutral-900 mb-2">Horário de Atendimento</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Segunda a Sexta: 08h às 17h<br />
                    Sábado: 08h às 12h<br />
                    Domingo: Fechado
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-neutral-100"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.366479707297!2d-34.896740624024344!3d-8.064040191963051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18bbd3a7776d%3A0xb35a0fb76b8c4d29!2sEmpresarial%20Charles%20Darwin!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
