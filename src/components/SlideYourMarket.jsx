import { motion } from 'framer-motion';
import { MapPin, Target, Wrench, Building2 } from 'lucide-react';
import { PARTNER_DATA } from '../config/partnerData';
import darkLogo from '../assets/logos/dieselmatic-dark.svg';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

const INFO_CARDS = [
  { icon: MapPin, label: 'Location', value: `${PARTNER_DATA.city}, ${PARTNER_DATA.state}` },
  { icon: Target, label: 'Target Radius', value: `${PARTNER_DATA.targetRadiusMiles} miles around ${PARTNER_DATA.city}` },
  { icon: Wrench, label: 'Top Specialties', value: PARTNER_DATA.topSpecialties.join(', ') },
  { icon: Building2, label: 'Local Competition', value: `${PARTNER_DATA.competitors.length} key competitors identified` },
];

function RadiusVisualization() {
  const rings = [1, 0.7, 0.4];
  return (
    <div className="bg-brand-black rounded-2xl p-8 h-full flex items-center justify-center min-h-[250px] lg:min-h-[400px]">
      <div className="relative w-64 h-64">
        {rings.map((scale, i) => (
          <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale, opacity: 0.15 + i * 0.1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-2 border-brand-orange" />
        ))}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-orange rounded-full shadow-lg shadow-brand-orange/50" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute top-1/2 left-1/2 translate-x-4 -translate-y-8 text-brand-white font-body font-semibold text-lg">
          {PARTNER_DATA.targetRadiusMiles} mi
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-brand-white/50 font-body text-xs text-center">
          {PARTNER_DATA.city}, {PARTNER_DATA.state}
        </motion.div>
      </div>
    </div>
  );
}

export default function SlideYourMarket({ isActive }) {
  return (
    <div className="min-h-screen w-screen bg-brand-white flex items-center justify-center relative overflow-y-auto py-16 lg:py-0">
      <img src={darkLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div variants={container} initial="hidden" animate={isActive ? 'show' : 'hidden'}
        className="max-w-6xl w-full px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-black mb-6 lg:mb-10">
            Your Market at a Glance
          </motion.h2>
          <div className="space-y-4 mb-8">
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} variants={fadeUp} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-black/50 font-body uppercase tracking-wide mb-0.5">{card.label}</div>
                    <div className="text-sm font-body font-semibold text-brand-black">{card.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div variants={fadeUp} className="mb-6">
            <table className="w-full text-sm font-body">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2 text-brand-black/50 font-medium text-xs uppercase tracking-wide">Competitor</th>
                <th className="text-left py-2 text-brand-black/50 font-medium text-xs uppercase tracking-wide">Website</th>
              </tr></thead>
              <tbody>
                {PARTNER_DATA.competitors.map((c) => (
                  <tr key={c.name} className="border-b border-gray-100">
                    <td className="py-2.5 text-brand-black font-medium">{c.name}</td>
                    <td className="py-2.5 text-brand-black/60">{c.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-brand-black/60 font-body">
            Our job is to make sure{' '}<span className="font-semibold text-brand-black">{PARTNER_DATA.companyName}</span>{' '}
            shows up first when someone in {PARTNER_DATA.city} searches for diesel repair.
          </motion.p>
        </div>
        <motion.div variants={fadeUp} className="lg:col-span-2"><RadiusVisualization /></motion.div>
      </motion.div>
    </div>
  );
}
