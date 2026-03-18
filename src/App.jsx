import Presentation from './components/Presentation';
import SlideWelcome from './components/SlideWelcome';
import SlideWhyDieselmatic from './components/SlideWhyDieselmatic';
import SlideYourMarket from './components/SlideYourMarket';
import SlideYourPlan from './components/SlideYourPlan';
import SlideROICalculator from './components/SlideROICalculator';
import SlideSEOGrowth from './components/SlideSEOGrowth';
import SlideFirst90Days from './components/SlideFirst90Days';
import SlideWhatWeNeed from './components/SlideWhatWeNeed';
import SlideAccountManager from './components/SlideAccountManager';

const slides = [
  SlideWelcome,
  SlideWhyDieselmatic,
  SlideYourMarket,
  SlideYourPlan,
  SlideROICalculator,
  SlideSEOGrowth,
  SlideFirst90Days,
  SlideWhatWeNeed,
  SlideAccountManager,
];

const darkSlides = [0, 1, 5, 8];

export default function App() {
  return <Presentation slides={slides} darkSlides={darkSlides} />;
}
