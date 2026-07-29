import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const gallery = [
  {
    type: 'image',
    src: '/paciente-dr-rodrigo.jpg', // A foto enviada 1
    alt: 'Dr. Rodrigo com paciente 1'
  },
  {
    type: 'image',
    src: '/paciente-dr-rodrigo-2.jpg', // A foto enviada 2
    alt: 'Dr. Rodrigo com paciente 2'
  },
  {
    type: 'image',
    src: '/paciente-dr-rodrigo-3.jpg', // A foto enviada 3
    alt: 'Dr. Rodrigo com paciente 3'
  },
  {
    type: 'image',
    src: '/paciente-dr-rodrigo-4.jpg', // A foto enviada 4
    alt: 'Dr. Rodrigo com paciente 4'
  },
  {
    type: 'image',
    src: '/paciente-dr-rodrigo-5.jpg', // A foto enviada 5
    alt: 'Dr. Rodrigo com paciente 5'
  },
  {
    type: 'video',
    src: '/video-1.mp4',
    poster: '',
    alt: 'Prova social 1'
  },
  {
    type: 'video',
    src: '/video-2.mp4',
    poster: '',
    alt: 'Prova social 2'
  },
  {
    type: 'video',
    src: '/video-3.mp4',
    poster: '',
    alt: 'Prova social 3'
  },
  {
    type: 'video',
    src: '/video-4.mp4',
    poster: '',
    alt: 'Prova social 4'
  },
  {
    type: 'video',
    src: '/video-5.mp4',
    poster: '',
    alt: 'Prova social 5'
  }
];

interface PatientsGalleryProps {
  onOpenQuiz?: () => void;
}

export default function PatientsGallery({ onOpenQuiz }: PatientsGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps'
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-primary-500 uppercase mb-4"
            >
              Nossos Pacientes
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-serif font-bold text-white"
            >
              Nossos cases de sucesso
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 mt-4 max-w-xl leading-relaxed"
            >
              Veja como transformamos sorrisos, devolvendo a autoestima e a saúde bucal de nossos pacientes com tratamento personalizado e tecnologia de ponta.
            </motion.p>
          </div>
          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center transition-all duration-300 ${!prevBtnEnabled
                ? 'text-neutral-600 opacity-30 cursor-not-allowed'
                : 'text-white hover:bg-primary-500 hover:border-primary-500 shadow-[0_0_15px_rgba(212,175,55,0)] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center transition-all duration-300 ${!nextBtnEnabled
                ? 'text-neutral-600 opacity-30 cursor-not-allowed'
                : 'text-white hover:bg-primary-500 hover:border-primary-500 shadow-[0_0_15px_rgba(212,175,55,0)] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-6">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="pl-6 flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl group bg-neutral-800 shadow-xl transition-transform duration-500 hover:-translate-y-2">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="w-full h-full object-cover"
                      playsInline
                      controls
                    />
                  ) : (
                    <>
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="flex md:hidden justify-center mt-8 gap-3">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${selectedIndex === i ? 'w-8 bg-primary-500' : 'w-2.5 bg-neutral-700'
                }`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <motion.button
            onClick={onOpenQuiz}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex justify-center items-center bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:-translate-y-1"
          >
            Quero transformar meu sorriso
          </motion.button>
        </div>
      </div>
    </section>
  );
}
