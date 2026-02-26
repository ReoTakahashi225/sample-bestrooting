import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { ProblemStatement } from './components/ProblemStatement/ProblemStatement';
import { Demo } from './components/Demo/Demo';
import { Benefits } from './components/Benefits/Benefits';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { UseCases } from './components/UseCases/UseCases';
import { CTA } from './components/CTA/CTA';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <Demo />
        <Benefits />
        <HowItWorks />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
