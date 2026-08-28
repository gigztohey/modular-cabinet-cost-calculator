import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Approach from "./components/Approach";
import Works from "./components/Works";
import Estimator from "./components/Estimator";
import Process from "./components/Process";
import { About, Contact } from "./components/AboutContact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="grain min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Approach />
        <Works />
        <Estimator />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
