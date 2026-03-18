import Presentation from './components/Presentation';
import SlideWelcome from './components/SlideWelcome';
import SlideWhyDieselmatic from './components/SlideWhyDieselmatic';
import SlideYourMarket from './components/SlideYourMarket';
import SlideYourPlan from './components/SlideYourPlan';
import SlideROICalculator from './components/SlideROICalculator';

const PlaceholderSlide = ({ title, dark }) => () => (
  <div className={`h-screen w-screen flex items-center justify-center ${dark ? 'bg-brand-black text-brand-white' : 'bg-brand-white text-brand-black'}`}>
    <h1 className="text-4xl font-bold">{title}</h1>
  </div>
);

const slides = [
  SlideWelcome,
  SlideWhyDieselmatic,
  SlideYourMarket,
  SlideYourPlan,
  SlideROICalculator,
  PlaceholderSlide({ title: 'Slide 6: SEO Growth', dark: true }),
  PlaceholderSlide({ title: 'Slide 7: First 90 Days', dark: false }),
  PlaceholderSlide({ title: 'Slide 8: What We Need', dark: false }),
  PlaceholderSlide({ title: 'Slide 9: Account Manager', dark: true }),
];

const darkSlides = [0, 1, 5, 8];

export default function App() {
  return <Presentation slides={slides} darkSlides={darkSlides} />;
}
