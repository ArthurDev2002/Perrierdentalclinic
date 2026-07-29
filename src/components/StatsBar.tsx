import { motion, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CounterProps {
  from: number;
  to: number;
  duration: number;
  decimals?: number;
  separator?: string;
}

function Counter({ from, to, duration, decimals = 0, separator = '' }: CounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        delay: 0.6, // Começa a contar junto com a animação de entrada
        onUpdate(value) {
          if (nodeRef.current) {
            let formattedValue = value.toFixed(decimals);
            if (decimals > 0) {
              formattedValue = formattedValue.replace('.', ',');
            }
            if (separator && value >= 1000) {
              formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
            }
            nodeRef.current.textContent = formattedValue;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, decimals, separator]);

  return <span ref={nodeRef}>{from.toFixed(decimals).replace('.', ',')}</span>;
}

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="relative z-20 w-full px-6 -mt-[60px] max-w-6xl mx-auto"
    >
      <div className="bg-[#fdfdfc] border-t-[3px] border-primary-500 rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-row items-start md:items-center justify-between divide-x divide-[#e8e6df]">

        {/* Bloco 1 */}
        <div className="w-1/3 py-4 md:py-8 px-1 sm:px-2 md:px-4 flex flex-col items-center text-center">
          <div className="text-primary-500 font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 flex items-center justify-center">
            <Counter from={0} to={4.9} decimals={1} duration={3} />
            <span className="text-sm md:text-2xl ml-1 font-medium opacity-80">/5</span>
          </div>
          <p className="text-neutral-500 font-body text-[9px] sm:text-[11px] md:text-[13px] tracking-wide font-medium leading-tight">
            Avaliação no Google
          </p>
        </div>

        {/* Bloco 2 */}
        <div className="w-1/3 py-4 md:py-8 px-1 sm:px-2 md:px-4 flex flex-col items-center text-center">
          <div className="text-primary-500 font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 flex items-center justify-center">
            <Counter from={0} to={138} duration={3} />
          </div>
          <p className="text-neutral-500 font-body text-[9px] sm:text-[11px] md:text-[13px] tracking-wide font-medium leading-tight">
            Avaliações 5 estrelas
          </p>
        </div>

        {/* Bloco 3 */}
        <div className="w-1/3 py-4 md:py-8 px-1 sm:px-2 md:px-4 flex flex-col items-center text-center">
          <div className="text-primary-500 font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 flex items-center justify-center">
            <span className="text-xl md:text-3xl mr-0.5 md:mr-1 font-medium opacity-80">+</span>
            <Counter from={0} to={1500} duration={4} separator="." />
          </div>
          <p className="text-neutral-500 font-body text-[9px] sm:text-[11px] md:text-[13px] tracking-wide font-medium leading-tight">
            Pacientes que confiaram
          </p>
        </div>

      </div>
    </motion.div>
  );
}
