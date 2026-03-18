import { motion } from 'framer-motion';
import { Shield, CreditCard, Palette, Camera, Share2, BookOpen } from 'lucide-react';
import darkLogo from '../assets/logos/dieselmatic-dark.svg';

const CHECKLIST = [
  { icon: Shield, title: 'Google Business Profile Access', description: "We need access to optimize your GBP listing. If you're not sure how, we'll walk you through it right now.", priority: 'high' },
  { icon: CreditCard, title: 'Google Ads Account Access', description: "We need manager access to your Google Ads account (or we'll create one for you).", priority: 'high' },
  { icon: Palette, title: 'Logo & Brand Colors', description: "Send us your logo file and let us know your preferred colors. If you don't have strong preferences, we'll design something great.", priority: 'medium' },
  { icon: Camera, title: '5-10 Photos of Your Shop', description: "Photos of your shop exterior, your team, trucks you've worked on, and your equipment. Phone photos are fine for now — the photographer will get the professional shots later.", priority: 'medium' },
  { icon: Share2, title: 'Facebook/Instagram Access', description: 'Admin access to your business pages so we can manage your social presence.', priority: 'medium' },
  { icon: BookOpen, title: 'Your Origin Story', description: 'How did you get started? What makes your shop different? This helps us write content that sounds like you.', priority: 'helpful' },
];

const PRIORITY_STYLES = {
  high: { bg: 'bg-brand-green/10', text: 'text-brand-green', label: 'High Priority' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', label: 'Medium' },
  helpful: { bg: 'bg-brand-blue/10', text: 'text-brand-blue', label: 'Helpful' },
};

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

export default function SlideWhatWeNeed({ isActive }) {
  return (
    <div className="min-h-screen w-screen bg-brand-white flex items-center justify-center relative overflow-y-auto">
      <img src={darkLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <motion.div initial="hidden" animate={isActive ? 'show' : 'hidden'}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        className="max-w-3xl w-full px-8 py-20">
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-black mb-2 text-center">
          A Few Things <span className="text-brand-orange">We Need</span> From You
        </motion.h2>
        <motion.p variants={fadeUp} className="text-brand-black/50 font-body text-center mb-10">
          The faster we get these, the faster you start getting leads.
        </motion.p>
        <div className="space-y-4 mb-8">
          {CHECKLIST.map((item) => {
            const Icon = item.icon;
            const priority = PRIORITY_STYLES[item.priority];
            return (
              <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand-orange" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-body font-bold text-brand-black">{item.title}</h3>
                    <span className={`text-[10px] font-body font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priority.bg} ${priority.text}`}>{priority.label}</span>
                  </div>
                  <p className="text-sm text-brand-black/60 font-body">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <motion.p variants={fadeUp} className="text-sm text-brand-black/50 font-body text-center">
          Don't worry about getting everything perfect right now. The most important items are{' '}
          <span className="font-semibold text-brand-black">GBP access</span> and{' '}
          <span className="font-semibold text-brand-black">Google Ads access</span> —
          those let us start building immediately. Everything else we can collect over the next few days.
        </motion.p>
      </motion.div>
    </div>
  );
}
