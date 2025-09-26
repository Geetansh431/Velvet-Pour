import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import { useState } from 'react';

import Preloader from './components/Preloader';
import BackgroundAudio from './components/BackgroundAudio';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import Cocktails from './components/Cocktails';
import About from './components/About'
import Art from "./components/Art"
import Menu from './components/Menu.jsx'
import Footer from "./components/Footer.jsx"

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true);
  };

  return (
    <>
      {!isPreloaderComplete && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      
      {isPreloaderComplete && (
        <>
          <BackgroundAudio />
          <main>
            <Navbar />
            <Hero/>
            <Cocktails/>
            <About/>
            <Art/>
            <Menu />
            <Footer/>
          </main>
        </>
      )}
    </>
  );
}

export default App
