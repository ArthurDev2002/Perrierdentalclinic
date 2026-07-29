import { MapPin, Phone } from 'lucide-react';



interface FooterProps {
  onOpenQuiz?: () => void;
}

export default function Footer({ onOpenQuiz }: FooterProps) {
  return (
    <footer className="bg-neutral-900 pt-20 pb-10 border-t-4 border-primary-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-bold text-white tracking-wide">Perrier</span>
              <span className="font-sans text-xs tracking-[0.2em] text-primary-500 uppercase">Dental Clinic</span>
            </a>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Odontologia premium com foco em Reabilitação Oral, Implantodontia e estética dental. Transformando sorrisos com excelência e cuidado humano.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-lg mb-6">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#sobre" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">Sobre Nós</a></li>
              <li><a href="#tratamentos" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">Tratamentos</a></li>
              <li><a href="#doutor" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">Dr. Rodrigo Perrier</a></li>
              <li><a href="#depoimentos" className="text-neutral-400 hover:text-primary-500 transition-colors text-sm">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400 text-sm">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>Empresarial Charles Darwin<br/>Sala 1307, Ilha do Leite<br/>Recife - PE</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>(81) 8792-8331</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-lg mb-6">Redes Sociais</h4>
            <div className="flex gap-4 mb-8">
              <a href="https://instagram.com/perrierdentalclinic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
            <button 
              onClick={onOpenQuiz}
              className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all w-full"
            >
              Agendar Consulta
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} Perrier Dental Clinic. Todos os direitos reservados. Responsável Técnico: Dr. Rodrigo Perrier.
          </p>
          <p className="text-neutral-600 text-xs">
            Desenvolvido por Antigravity
          </p>
        </div>
      </div>
    </footer>
  );
}
