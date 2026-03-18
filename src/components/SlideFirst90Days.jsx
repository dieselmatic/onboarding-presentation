import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { PARTNER_DATA } from '../config/partnerData';
import darkLogo from '../assets/logos/dieselmatic-dark.svg';

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateRange(start, end) {
  const opts = { month: 'short', day: 'numeric' };
  if (end) return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}, ${start.getFullYear()}`;
  return `${start.toLocaleDateString('en-US', opts)}, ${start.getFullYear()}`;
}

function buildMilestones(callDate) {
  return [
    { date: formatDateRange(new Date(callDate + 'T00:00:00')), dateLabel: 'TODAY', status: 'complete', title: 'Onboarding Call Complete', description: 'We just mapped out your market, your goals, and your plan. Our build team starts today.' },
    { date: formatDateRange(addDays(callDate, 2), addDays(callDate, 4)), dateLabel: 'THIS WEEK', status: 'current', title: 'Your Website Build Begins', description: 'Our designers are building your custom Dieselmatic website using your brand and content.' },
    { date: formatDateRange(addDays(callDate, 11), addDays(callDate, 14)), dateLabel: 'PHASE 1 LAUNCH', status: 'upcoming', title: 'Your Website Goes Live', description: 'Phase 1 of your site launches with professional stock imagery. Your web presence is live and searchable.', highlight: true, subNote: 'Google Ads go live the same week. Leads start flowing.' },
    { date: formatDateRange(addDays(callDate, 14), addDays(callDate, 18)), status: 'upcoming', title: 'Photographer Visits Your Shop', description: 'A professional photographer captures your shop, team, and work. These images make your site truly yours.' },
    { date: formatDateRange(addDays(callDate, 21), addDays(callDate, 28)), dateLabel: 'PHASE 2 LAUNCH', status: 'upcoming', title: 'Website Updated with Your Photos', description: 'Stock images replaced with your real photos. Design refinements incorporated. Your site is in its final form.', highlight: true },
    { date: formatDateRange(addDays(callDate, 28), addDays(callDate, 42)), dateLabel: 'MONTH 2', status: 'upcoming', title: 'Google Ads Optimize', description: "Campaign data builds. Google's algorithm learns your ideal customer. Cost per lead decreases week over week." },
    { date: formatDateRange(addDays(callDate, 42), addDays(callDate, 60)), dateLabel: 'MONTH 2-3', status: 'upcoming', title: 'SEO Kicks In', description: 'Your GBP starts ranking. Citations propagate. Organic leads begin supplementing your paid campaigns.' },
    { date: `${addDays(callDate, 60).toLocaleDateString('en-US', { month: 'short' })}+`, dateLabel: 'MONTH 3+', status: 'upcoming', title: 'Compounding Growth', description: 'Paid + organic leads compound. Your total lead volume grows. This is where the long-term ROI kicks in.' },
  ];
}

const statusColors = { complete: 'bg-brand-green', current: 'bg-brand-orange', upcoming: 'bg-gray-300' };
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function SlideFirst90Days({ isActive }) {
  const milestones = buildMilestones(PARTNER_DATA.onboardingCallDate);
  return (
    <div className="min-h-screen w-screen bg-brand-white flex items-center justify-center relative overflow-y-auto">
      <img src={darkLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div initial="hidden" animate={isActive ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        className="max-w-3xl w-full px-8 py-20">
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-black mb-2 text-center">
          Your First <span className="text-brand-orange">90 Days</span> with Dieselmatic
        </motion.h2>
        <motion.p variants={fadeUp} className="text-brand-black/50 font-body text-center mb-10">Here's exactly what's happening and when.</motion.p>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-brand-orange/20" />
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-5">
                <div className="relative shrink-0 mt-1.5">
                  <div className={`w-4 h-4 rounded-full ${statusColors[m.status]} ${m.status === 'current' ? 'ring-4 ring-brand-orange/20' : ''}`} />
                </div>
                <div className={`flex-1 pb-2 ${m.highlight ? 'bg-brand-orange/5 rounded-xl p-4 -mt-2 border border-brand-orange/10' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-brand-black/40 font-body">{m.date}</span>
                    {m.dateLabel && (
                      <span className={`text-[10px] font-body font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        m.status === 'complete' ? 'bg-brand-green/10 text-brand-green'
                          : m.status === 'current' ? 'bg-brand-orange/10 text-brand-orange'
                            : 'bg-gray-100 text-brand-black/40'
                      }`}>{m.dateLabel}</span>
                    )}
                  </div>
                  <h3 className="text-base font-body font-bold text-brand-black mb-1">{m.title}</h3>
                  <p className="text-sm text-brand-black/60 font-body">{m.description}</p>
                  {m.subNote && (
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-brand-orange font-body font-medium">
                      <Zap size={14} /> {m.subNote}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
