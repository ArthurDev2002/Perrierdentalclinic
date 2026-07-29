import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutClinic from './components/AboutClinic';
import Services from './components/Services';
import AboutDoctor from './components/AboutDoctor';
import Testimonials from './components/Testimonials';
import PatientsGallery from './components/PatientsGallery';
import FAQ from './components/FAQ';
import SpaceGallery from './components/SpaceGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuizModal from './components/QuizModal';
import FloatingChat from './components/FloatingChat';

function App() {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const handleOpenQuiz = () => setIsQuizModalOpen(true);

  return (
    <div className="font-body antialiased text-neutral-800 bg-secondary-50 overflow-x-hidden">
      <Header onOpenQuiz={handleOpenQuiz} />
      <main>
        <Hero onOpenQuiz={handleOpenQuiz} />
        <StatsBar />
        <AboutClinic />
        <AboutDoctor onOpenQuiz={handleOpenQuiz} />
        <Services onOpenQuiz={handleOpenQuiz} />
        <SpaceGallery onOpenQuiz={handleOpenQuiz} />
        <PatientsGallery onOpenQuiz={handleOpenQuiz} />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer onOpenQuiz={handleOpenQuiz} />
      
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
      />

      <FloatingChat />

      {/* Watermark DEMONSTRAÇÃO */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="watermark" x="0" y="0" width="280" height="200" patternUnits="userSpaceOnUse">
              <text x="140" y="100" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="black" transform="rotate(-35 140 100)">
                DEMONSTRAÇÃO
              </text>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#watermark)" />
        </svg>
      </div>
    </div>
  );
}

export default App;
