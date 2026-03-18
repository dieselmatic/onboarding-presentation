import { motion } from 'framer-motion';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import whiteLogo from '../assets/logos/dieselmatic-white.svg';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const STATS = [
  { value: 250, suffix: '+', label: 'Diesel Repair Shops Served' },
  { value: 100, suffix: '%', label: 'Diesel Exclusive — No Other Industries' },
  { value: 5, suffix: '+', label: 'Years Powering Diesel Shop Growth' },
];

const TESTIMONIALS = [
  { quote: 'Dieselmatic doubled our call volume in 60 days.', name: 'Jake R.', company: 'Fleet Master Diesel' },
  { quote: 'Best marketing investment we\'ve ever made.', name: 'Carlos M.', company: 'Summit Diesel' },
  { quote: 'They actually understand our business.', name: 'Tony B.', company: 'Iron Horse Truck Repair' },
];

function AnimatedStat({ value, suffix, label, animate }) {
  const display = useAnimatedNumber(animate ? value : 0, { format: 'integer', suffix });
  return (
    <div className="text-center px-8">
      <div className="text-6xl lg:text-7xl font-bold font-body text-brand-orange tabular-nums mb-3">{display}</div>
      <div className="text-sm lg:text-base text-brand-white/70 font-body max-w-[200px] mx-auto">{label}</div>
    </div>
  );
}

export default function SlideWhyDieselmatic({ isActive }) {
  return (
    <div className="h-screen w-screen bg-brand-black flex items-center justify-center relative">
      <img src={whiteLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div variants={container} initial="hidden" animate={isActive ? 'show' : 'hidden'} className="text-center z-10 px-8 max-w-6xl">
        <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-headline font-extrabold italic text-brand-white mb-16">
          We Only Do One Thing.{' '}<span className="text-brand-orange">And We're the Best at It.</span>
        </motion.h2>
        <motion.div variants={fadeUp} className="flex justify-center gap-12 lg:gap-20 mb-14">
          {STATS.map((stat) => (<AnimatedStat key={stat.label} {...stat} animate={isActive} />))}
        </motion.div>
        <motion.p variants={fadeUp} className="text-lg text-brand-white/60 font-body max-w-3xl mx-auto mb-14">
          We don't do restaurants, lawyers, or plumbers. Every strategy, every ad, every website we build is engineered specifically for diesel repair shops. That focus is your unfair advantage.
        </motion.p>
        <motion.div variants={fadeUp} className="flex gap-6 justify-center">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-brand-black-alt rounded-xl p-6 max-w-xs">
              <p className="text-brand-white/80 italic font-body text-sm mb-3">"{t.quote}"</p>
              <p className="text-brand-white/50 text-xs font-body">— {t.name}, {t.company}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
