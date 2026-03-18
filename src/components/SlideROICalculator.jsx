import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Lightbulb } from 'lucide-react';
import { PARTNER_DATA } from '../config/partnerData';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import darkLogo from '../assets/logos/dieselmatic-dark.svg';

const SLIDER_CONFIG = [
  { key: 'budget', label: 'Monthly Google Ads Budget', description: 'How much you invest in Google Ads each month', min: 500, max: 5000, step: 100, format: (v) => `$${v.toLocaleString()}` },
  { key: 'cpc', label: 'Average Cost Per Click', description: 'What Google charges each time someone clicks your ad', min: 2, max: 15, step: 0.5, format: (v) => `$${v.toFixed(2)}` },
  { key: 'convRate', label: 'Click-to-Lead Conversion Rate', description: '% of website visitors who call or submit a form', min: 3, max: 25, step: 1, format: (v) => `${v}%` },
  { key: 'closeRate', label: 'Lead-to-Customer Close Rate', description: '% of leads your shop turns into paying customers', min: 20, max: 80, step: 5, format: (v) => `${v}%` },
  { key: 'avgInvoice', label: 'Average Invoice Value', description: 'Your typical repair order total', min: 300, max: 5000, step: 100, format: (v) => `$${v.toLocaleString()}` },
  { key: 'margin', label: 'Profit Margin', description: 'Your profit after parts, labor, and overhead', min: 10, max: 60, step: 5, format: (v) => `${v}%` },
];

const SCENARIOS = [
  { label: 'Conservative Estimate', values: { cpc: 8, convRate: 7, closeRate: 35 } },
  { label: 'Expected Performance', values: { cpc: 5.5, convRate: 10, closeRate: 50 } },
  { label: 'If You Crush Your Follow-Up', values: { cpc: 5.5, convRate: 10, closeRate: 70 } },
];

function RangeSlider({ min, max, step, value, onChange }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <input
      type="range" min={min} max={max} step={step} value={value} onChange={onChange}
      className="slider-track w-full"
      style={{ background: `linear-gradient(to right, #f27226 0%, #f27226 ${percent}%, rgba(0,0,0,0.08) ${percent}%, rgba(0,0,0,0.08) 100%)` }}
    />
  );
}

function OutputNumber({ value, format, label, size = 'normal', hero = false }) {
  const display = useAnimatedNumber(value, { format });
  const isNegative = value < 0;
  const sizeClasses = { normal: 'text-xl sm:text-2xl lg:text-3xl', large: 'text-3xl lg:text-4xl', hero: 'text-3xl sm:text-4xl lg:text-5xl' };
  return (
    <div className={hero ? 'text-center' : ''}>
      <div className={`font-body font-bold tabular-nums ${sizeClasses[size]} ${hero ? (isNegative ? 'text-brand-red' : 'text-brand-green') : 'text-brand-black'}`}>
        {display}
      </div>
      <div className="text-xs text-brand-black/50 font-body mt-1">{label}</div>
    </div>
  );
}

export default function SlideROICalculator({ isActive }) {
  const [values, setValues] = useState({
    budget: PARTNER_DATA.monthlyAdsBudget,
    cpc: PARTNER_DATA.estimatedCPC,
    convRate: PARTNER_DATA.estimatedConversionRate,
    closeRate: PARTNER_DATA.estimatedCloseRate,
    avgInvoice: PARTNER_DATA.averageInvoice,
    margin: PARTNER_DATA.profitMargin,
  });

  const updateValue = (key, val) => setValues((prev) => ({ ...prev, [key]: Number(val) }));
  const applyScenario = (scenario) => setValues((prev) => ({ ...prev, ...scenario.values }));

  const calc = useMemo(() => {
    const clicks = values.budget / values.cpc;
    const leads = clicks * (values.convRate / 100);
    const costPerLead = leads > 0 ? values.budget / leads : 0;
    const customers = leads * (values.closeRate / 100);
    const costPerCustomer = customers > 0 ? values.budget / customers : 0;
    const revenue = customers * values.avgInvoice;
    const profit = revenue * (values.margin / 100);
    const roas = values.budget > 0 ? revenue / values.budget : 0;
    const netProfit = profit - values.budget;
    return { clicks, leads, costPerLead, customers, costPerCustomer, revenue, profit, roas, netProfit };
  }, [values]);

  return (
    <div className="min-h-screen w-screen bg-brand-white flex flex-col relative overflow-y-auto">
      <img src={darkLogo} alt="Dieselmatic" className="absolute top-6 left-6 w-[120px] z-10" />
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-extrabold italic text-brand-black mb-2">
              Google Ads <span className="text-brand-orange">ROI Calculator</span>
            </h2>
            <p className="text-sm text-brand-black/50 font-body">Adjust the sliders to see your projected returns</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* LEFT: Inputs */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-5">
              {SLIDER_CONFIG.map((slider) => (
                <div key={slider.key}>
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-sm font-body font-semibold text-brand-black">{slider.label}</label>
                    <span className="text-lg font-body font-bold text-brand-orange tabular-nums">{slider.format(values[slider.key])}</span>
                  </div>
                  <p className="text-xs text-brand-black/40 font-body mb-2">{slider.description}</p>
                  <RangeSlider min={slider.min} max={slider.max} step={slider.step} value={values[slider.key]} onChange={(e) => updateValue(slider.key, e.target.value)} />
                </div>
              ))}
            </motion.div>

            {/* RIGHT: Outputs */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={isActive ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-2">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs font-body font-semibold text-brand-black/40 uppercase tracking-wide mb-4">Your Ad Performance</div>
                <div className="grid grid-cols-3 gap-4">
                  <OutputNumber value={calc.clicks} format="integer" label="clicks/mo" />
                  <OutputNumber value={calc.leads} format="decimal" label="leads/mo" />
                  <OutputNumber value={calc.costPerLead} format="currency" label="per lead" />
                </div>
              </div>
              <div className="flex justify-center py-1"><ArrowDown size={20} className="text-brand-orange/40" /></div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs font-body font-semibold text-brand-black/40 uppercase tracking-wide mb-4">Customer Acquisition</div>
                <div className="grid grid-cols-2 gap-4">
                  <OutputNumber value={calc.customers} format="decimal" label="new customers/mo" />
                  <OutputNumber value={calc.costPerCustomer} format="currency" label="per customer" />
                </div>
              </div>
              <div className="flex justify-center py-1"><ArrowDown size={20} className="text-brand-orange/40" /></div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="text-xs font-body font-semibold text-brand-black/40 uppercase tracking-wide mb-4">Revenue & Profit</div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <OutputNumber value={calc.revenue} format="currency" label="monthly revenue" />
                  <OutputNumber value={calc.profit} format="currency" label="monthly profit" />
                  <OutputNumber value={calc.roas} format="multiplier" label="return on ad spend" />
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <OutputNumber value={calc.netProfit} format="currency" label="Net Profit After Ad Spend" size="hero" hero />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {SCENARIOS.map((s) => (
              <button key={s.label} onClick={() => applyScenario(s)}
                className="px-5 py-2.5 rounded-lg bg-brand-black text-brand-white text-sm font-body font-medium hover:bg-brand-black-alt transition-colors">
                {s.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-brand-orange/5 border-l-4 border-brand-orange rounded-r-xl p-5">
            <div className="flex items-start gap-3">
              <Lightbulb size={20} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-body font-bold text-brand-black mb-1">The Variable You Control</div>
                <p className="text-sm text-brand-black/70 font-body">
                  Cost per click is set by the market. Conversion rate is set by your website (we handle that). But your close rate? That's all you. Shops that answer every call within 3 rings and follow up on every lead within 5 minutes close 2-3x more jobs. Your close rate is the single biggest lever in this entire equation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
