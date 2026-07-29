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
    </div>
  );
}

export default App;
