import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Trophy, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  { src: "/images/hero/web-development.jpg", label: "Web Development" },
  { src: "/images/hero/custom-software.jpg", label: "Custom Software" },
  { src: "/images/hero/performance-infrastructure.jpg", label: "Performance & Infrastructure" },
  { src: "/images/hero/dedicated-support.jpg", label: "Dedicated Support" },
  { src: "/images/hero/professional-consulting.jpg", label: "Professional Consulting" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Preload every slide up front so the crossfade never waits on a network fetch
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-visible bg-background pb-32">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${heroSlides[current].src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
      </div>
      {/* Directional gradient for text legibility — keeps the image itself clear
          instead of a flat dark wash over the whole frame */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0e1f] via-[#0a0e1f]/75 via-30% to-[#0a0e1f]/10" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0e1f]/90 via-[#0a0e1f]/10 via-40% to-transparent" />
      {/* Subtle edge vignette for a cinematic, premium finish */}
      <div className="absolute inset-0 z-0 shadow-[inset_0_0_150px_60px_rgba(10,14,31,0.55)]" />

      {/* Carousel Indicators + current slide label */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-10 flex items-center gap-3">
        <span className="text-white/70 text-xs font-semibold uppercase tracking-widest hidden sm:block">
          {heroSlides[current].label}
        </span>
        <div className="flex gap-2 px-2.5 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show ${slide.label} slide`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current ? "w-8 bg-primary" : "w-4 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Container for content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-48 pb-16">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Website Design & Graphic Design <br />
            <span className="text-primary text-3xl sm:text-4xl md:text-5xl">in Kigali, Rwanda</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-xl mb-10"
          >
            Affordable website design, graphic design, logo maker, and app development — we transform your ideas into powerful, high-conversion digital products tailored to your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button variant="default" className="bg-transparent border border-primary hover:bg-primary/10 text-white rounded-none px-6 py-6" size="lg" asChild>
              <a href="#contact" className="group">
                Schedule a Consultation
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Overlapping Bottom Cards */}
      <div className="absolute -bottom-24 left-0 right-0 z-20 hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-0 max-w-6xl shadow-2xl mx-auto">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white text-slate-900 border-r border-slate-100 flex flex-col"
            >
              <div className="p-8 flex items-start gap-4 flex-1">
                <Trophy className="w-7 h-7 text-primary shrink-0" strokeWidth={1.5} />
                <h3 className="font-bold text-lg leading-snug mt-0.5">Leading Tech Agency<br/>in Rwanda</h3>
              </div>
              <div className="bg-slate-50 p-8 pt-6">
                <p className="text-sm text-slate-600">
                  A scalable development philosophy that empowers and pushes you completely past the competition.
                </p>
              </div>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white text-slate-900 border-r border-slate-100 flex flex-col"
            >
              <div className="p-8 flex items-start gap-4 flex-1">
                <Lock className="w-7 h-7 text-primary shrink-0" strokeWidth={1.5} />
                <h3 className="font-bold text-lg leading-snug mt-0.5">Modern Software<br/>Architecture</h3>
              </div>
              <div className="bg-slate-50 p-8 pt-6">
                <p className="text-sm text-slate-600">
                  Built with React, Next.js, and highly secure infrastructure tailored to your exact use case.
                </p>
              </div>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white text-slate-900 flex flex-col"
            >
              <div className="p-8 flex items-start gap-4 flex-1">
                <ShieldCheck className="w-7 h-7 text-primary shrink-0" strokeWidth={1.5} />
                <h3 className="font-bold text-lg leading-snug mt-0.5">Serving Global<br/>Clients Worldwide</h3>
              </div>
              <div className="bg-slate-50 p-8 pt-6">
                <p className="text-sm text-slate-600">
                  A reliable execution delivery making high-performance digital solutions accessible to everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
