import { motion } from 'framer-motion';
import { PARTNER_DATA } from '../config/partnerData';
import whiteLogo from '../assets/logos/dieselmatic-white.svg';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function SlideWelcome() {
  const { companyName, ownerFirstName, ownerLastName } = PARTNER_DATA;
  return (
    <div className="h-screen w-screen bg-brand-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px] animate-pulse" />
      <motion.div variants={container} initial="hidden" animate="show" className="text-center z-10 px-8">
        <motion.img variants={fadeUp} src={whiteLogo} alt="Dieselmatic" className="w-72 mx-auto mb-12" />
        <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-headline font-extrabold italic text-brand-white mb-6">
          Welcome to Dieselmatic,{' '}<span className="text-brand-orange">{companyName}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-xl lg:text-2xl text-brand-white/70 font-body mb-16">
          Let's build your growth engine, {ownerFirstName}.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm text-brand-white/30 font-body">
          Your personalized marketing plan — prepared for {ownerFirstName} {ownerLastName}
        </motion.p>
      </motion.div>
    </div>
  );
}
