import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import whiteLogo from '../assets/logos/dieselmatic-white.svg';

const SEO_DATA = [
  { month: 'Month 1', organic: 2, paid: 45, label: 'Foundation' },
  { month: 'Month 2', organic: 5, paid: 50 },
  { month: 'Month 3', organic: 12, paid: 52, label: 'First organic leads' },
  { month: 'Month 4', organic: 22, paid: 53 },
  { month: 'Month 5', organic: 32, paid: 55 },
  { month: 'Month 6', organic: 45, paid: 55, label: 'SEO gains traction' },
  { month: 'Month 7', organic: 55, paid: 56 },
  { month: 'Month 8', organic: 63, paid: 56 },
  { month: 'Month 9', organic: 72, paid: 57, label: 'Organic approaches paid' },
  { month: 'Month 10', organic: 78, paid: 57 },
  { month: 'Month 11', organic: 85, paid: 58 },
  { month: 'Month 12', organic: 92, paid: 58, label: 'Organic exceeds paid' },
];

const ANNOTATIONS = SEO_DATA.filter((d) => d.label);
const INSIGHTS = [
  { icon: Rocket, period: 'Month 1-2: Foundation', text: 'We optimize your Google Business Profile, build citations across 50+ directories, and implement on-page SEO. Google is indexing and learning about your business.' },
  { icon: TrendingUp, period: 'Month 3-6: Growth', text: 'Your GBP starts ranking in the local pack. Organic clicks begin. Every month builds on the last. This is where patience pays off.' },
  { icon: DollarSign, period: 'Month 7-12: Compounding', text: 'Organic leads supplement paid. Your total lead volume grows even if your ad budget stays the same. This is when the ROI math gets very compelling.' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-brand-black-alt border border-white/10 rounded-lg p-3 text-sm font-body">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-brand-orange">Organic: {payload[0]?.value}</p>
      <p className="text-white/60">Paid: {payload[1]?.value}</p>
    </div>
  );
}

export default function SlideSEOGrowth({ isActive }) {
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => { if (isActive) setAnimationKey((k) => k + 1); }, [isActive]);

  return (
    <div className="min-h-screen w-screen bg-brand-black flex flex-col items-center justify-center relative overflow-y-auto px-6 py-16">
      <img src={whiteLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div initial="hidden" animate={isActive ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }} className="max-w-6xl w-full">
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-white text-center mb-2">
          How Organic SEO <span className="text-brand-orange">Builds Over Time</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-brand-white/50 font-body text-center mb-8">
          Paid ads are your engine. SEO is your fuel efficiency.
        </motion.p>
        <motion.div variants={fadeUp} className="h-[220px] sm:h-[280px] lg:h-[320px] w-full mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart key={animationKey} data={SEO_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f27226" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f27226" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }} />
              <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.4)' }}
                label={{ value: 'Organic Visibility', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: 'rgba(255,255,255,0.3)' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="organic" stroke="#f27226" strokeWidth={3} fill="url(#organicGradient)"
                isAnimationActive={isActive} animationDuration={2000} animationEasing="ease-out" />
              <Area type="monotone" dataKey="paid" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="6 4"
                fill="none" isAnimationActive={isActive} animationDuration={2000} animationEasing="ease-out" />
              {ANNOTATIONS.map((ann) => (
                <ReferenceDot key={ann.month} x={ann.month} y={ann.organic} r={5} fill="#f27226" stroke="#1e1e1e" strokeWidth={2} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 lg:justify-between max-w-4xl mx-auto mb-8 px-4">
          {ANNOTATIONS.map((ann) => (
            <div key={ann.month} className="text-center max-w-[150px] min-w-[100px]">
              <div className="text-xs text-brand-orange font-body font-semibold">{ann.month}</div>
              <div className="text-xs text-brand-white/50 font-body">{ann.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {INSIGHTS.map((insight) => {
            const Icon = insight.icon;
            return (
              <div key={insight.period} className="bg-brand-black-alt rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className="text-brand-orange" />
                  <span className="text-sm font-body font-bold text-brand-white">{insight.period}</span>
                </div>
                <p className="text-sm text-brand-white/60 font-body">{insight.text}</p>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
