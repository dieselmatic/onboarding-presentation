import { motion } from 'framer-motion';
import { Globe, Target, Search, List, Share2, Star, BarChart3, User, CheckCircle2 } from 'lucide-react';
import { PARTNER_DATA } from '../config/partnerData';
import darkLogo from '../assets/logos/dieselmatic-dark.svg';

const ICON_MAP = { globe: Globe, target: Target, search: Search, list: List, share: Share2, star: Star, chart: BarChart3, user: User };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function SlideYourPlan({ isActive }) {
  const { planTier, planIncludes, city } = PARTNER_DATA;
  return (
    <div className="min-h-screen w-screen bg-brand-white flex items-center justify-center relative overflow-y-auto py-20 lg:py-0">
      <img src={darkLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div variants={container} initial="hidden" animate={isActive ? 'show' : 'hidden'} className="max-w-5xl w-full px-8 text-center">
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-5xl font-headline font-extrabold italic text-brand-black mb-3">
          Your <span className="text-brand-orange">{planTier}</span> Plan
        </motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-brand-black/60 font-body mb-12">
          Everything you need to dominate diesel repair marketing in {city}.
        </motion.p>
        <motion.div variants={container} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {planIncludes.map((item) => {
            const Icon = ICON_MAP[item.icon] || Globe;
            return (
              <motion.div key={item.name} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-left transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <CheckCircle2 size={20} className="text-brand-green" />
                </div>
                <div className="text-sm font-body font-semibold text-brand-black">{item.name}</div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.p variants={fadeUp} className="text-sm text-brand-black/50 font-body max-w-2xl mx-auto">
          This isn't a cookie-cutter marketing package. Every element is built specifically for diesel repair shops in your market.
        </motion.p>
      </motion.div>
    </div>
  );
}
