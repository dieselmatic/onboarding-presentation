import Presentation from './components/Presentation';

const PlaceholderSlide = ({ title, dark }) => () => (
  <div className={`h-screen w-screen flex items-center justify-center ${dark ? 'bg-brand-black text-brand-white' : 'bg-brand-white text-brand-black'}`}>
    <h1 className="text-4xl font-bold">{title}</h1>
  </div>
);

const slides = [
  PlaceholderSlide({ title: 'Slide 1: Welcome', dark: true }),
  PlaceholderSlide({ title: 'Slide 2: Why Dieselmatic', dark: true }),
  PlaceholderSlide({ title: 'Slide 3: Your Market', dark: false }),
  PlaceholderSlide({ title: 'Slide 4: Your Plan', dark: false }),
  PlaceholderSlide({ title: 'Slide 5: ROI Calculator', dark: false }),
  PlaceholderSlide({ title: 'Slide 6: SEO Growth', dark: true }),
  PlaceholderSlide({ title: 'Slide 7: First 90 Days', dark: false }),
  PlaceholderSlide({ title: 'Slide 8: What We Need', dark: false }),
  PlaceholderSlide({ title: 'Slide 9: Account Manager', dark: true }),
];

const darkSlides = [0, 1, 5, 8];

export default function App() {
  return <Presentation slides={slides} darkSlides={darkSlides} />;
}
