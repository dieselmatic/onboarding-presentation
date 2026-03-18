import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, ExternalLink } from 'lucide-react';
import { PARTNER_DATA } from '../config/partnerData';
import whiteLogo from '../assets/logos/dieselmatic-white.svg';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

function getInitials(name) { return name.split(' ').map((n) => n[0]).join('').toUpperCase(); }

export default function SlideAccountManager({ isActive }) {
  const { amName, amTitle, amEmail, amPhone, amCalendarLink, portalLink, ownerFirstName } = PARTNER_DATA;
  return (
    <div className="h-screen w-screen bg-brand-black flex items-center justify-center relative">
      <img src={whiteLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div initial="hidden" animate={isActive ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        className="text-center px-8 max-w-2xl">
        <motion.div variants={fadeUp} className="w-24 h-24 rounded-full bg-brand-orange/20 border-2 border-brand-orange flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl font-body font-bold text-brand-orange">{getInitials(amName)}</span>
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-white mb-1">{amName}</motion.h2>
        <motion.p variants={fadeUp} className="text-brand-white/50 font-body mb-8">{amTitle}</motion.p>
        <motion.div variants={fadeUp} className="space-y-3 mb-10">
          <a href={`mailto:${amEmail}`} className="flex items-center justify-center gap-3 text-brand-white/70 hover:text-brand-white transition-colors font-body">
            <Mail size={18} className="text-brand-orange" />{amEmail}
          </a>
          <a href={`tel:${amPhone}`} className="flex items-center justify-center gap-3 text-brand-white/70 hover:text-brand-white transition-colors font-body">
            <Phone size={18} className="text-brand-orange" />{amPhone}
          </a>
          <a href={amCalendarLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-brand-white/70 hover:text-brand-white transition-colors font-body">
            <Calendar size={18} className="text-brand-orange" />Book time with me anytime
          </a>
        </motion.div>
        <motion.div variants={fadeUp} className="mb-12">
          <a href={portalLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-body font-semibold rounded-lg transition-colors">
            Track your build progress <ExternalLink size={16} />
          </a>
        </motion.div>
        <motion.h3 variants={fadeUp} className="text-2xl lg:text-3xl font-headline font-extrabold italic text-brand-white">
          Let's fill those bays, <span className="text-brand-orange">{ownerFirstName}</span>.
        </motion.h3>
      </motion.div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <img src={whiteLogo} alt="Dieselmatic" className="w-28 opacity-30" />
        <p className="text-xs text-brand-white/20 font-body">&copy; 2026 Dieselmatic. Built exclusively for diesel repair shops.</p>
      </div>
    </div>
  );
}
