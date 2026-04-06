import { motion } from "framer-motion";
import { ArrowRight, Trophy, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-visible bg-background pb-32">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/portfolio picture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      {/* Dark tint overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-[#0f0b29]/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0f0b29] to-transparent/50" />
      
      {/* Container for content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-48 pb-16">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
          >
            Affordable Web & App Development <br />
            <span className="text-primary text-3xl sm:text-4xl md:text-5xl">suitable for your business in Rwanda</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-xl mb-10"
          >
            We transform your ideas into powerful, high-conversion web & mobile products tailored perfectly to your business needs.
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
