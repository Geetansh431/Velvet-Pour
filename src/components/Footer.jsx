import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { useRef } from "react";
import { socials } from '../../constants/index.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Fade in the footer content sections
    gsap.from(footer.children[1].children, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate social icons
    gsap.from(footer.querySelectorAll('.social-icon'), {
      scale: 0,
      rotation: 180,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate go to top text and contact info
    gsap.from([footer.querySelector('.go-to-top'), footer.querySelector('.contact-info')], {
      y: 10,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  return (
    <footer ref={footerRef} className="relative h-screen w-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
        >
          <source src="/videos/footer_image_cocktail.mp4" type="video/mp4" />
          {/* Fallback to a static image if video fails */}
          <source src="/videos/output.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex size-full flex-col items-center justify-center">
        
        {/* Main Brand Logo */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <h1 className="font-modern-negra text-6xl font-black text-gradient md:text-8xl">
              VELVET
            </h1>
            <span className="font-modern-negra text-6xl font-black text-white md:text-8xl">
              POUR
            </span>
          </div>
          
          <p className="mx-auto max-w-2xl font-serif text-lg text-white/80 md:text-xl">
            Where Every Cocktail Tells a Story • Experience Craft Excellence
          </p>
        </div>

        {/* Quick Contact Info */}
        <div className="contact-info mb-12 text-center">
          <div className="mb-4 text-white/90">
            <p className="text-lg font-serif">456, Raq Blvd. #404, India</p>
            <p className="text-sm text-white/70">(555) 555-5555 • geetanshg2@gmail.com</p>
          </div>
          <div className="text-white/70">
            <p className="text-sm">Open Daily • 5:00 PM - 2:00 AM</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group relative flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-yellow/50 hover:bg-yellow/20"
                aria-label={`Follow us on ${social.name}`}
              >
                <img 
                  src={social.icon} 
                  alt={social.name}
                  className="w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-12 w-full px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-baseline md:justify-between md:px-12">
            <div className="text-center md:text-left">
              <p className="font-serif text-sm text-white/50 mb-1">
                © Velvet Pour. Crafted with passion in India.
              </p>
              <p className="font-serif text-xs text-white/30">
                Please drink responsibly • Must be 18+ to enter
              </p>
            </div>
            
            {/* Go to Top Button */}
            <button
              onClick={() => {
                // Simple smooth scroll to top
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
                
                // Alternative GSAP method (uncomment if you prefer GSAP control)
                // gsap.to(window, {
                //   duration: 2,
                //   scrollTo: { y: 0 },
                //   ease: "power2.inOut"
                // });
              }}
              className="go-to-top group cursor-pointer font-serif text-sm text-white/50 transition-colors hover:text-yellow"
              title="Go to top"
            >
              <span className="inline-flex items-center gap-2 transition-transform group-hover:-translate-y-0.5">
                Back to Top
                <span className="text-base transition-transform group-hover:-translate-y-1 group-hover:text-yellow">↑</span>
              </span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-1/2 top-8 -translate-x-1/2">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-yellow to-transparent opacity-60" />
        </div>

        {/* Floating Cocktail Icon */}
        <div className="absolute top-20 right-20 opacity-20 hidden lg:block">
          <div className="text-6xl">🍸</div>
        </div>
        
        <div className="absolute bottom-32 left-20 opacity-10 hidden lg:block">
          <div className="text-4xl">🥃</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
