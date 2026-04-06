import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 z-0 hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Asymmetric Visual Stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/images/bosswebber in office.png"
                alt="Bosco Niyitegeka - Bosswebber Founder"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Overlapping secondary image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-10 w-2/3 rounded-2xl overflow-hidden shadow-2xl border-8 border-white z-20 hidden md:block"
            >
              <img
                src="/images/developper in office.png"
                alt="Web Development in Rwanda"
                className="w-full h-[300px] object-cover"
              />
            </motion.div>

            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl z-30 flex flex-col items-center justify-center min-w-[140px]"
            >
              <span className="text-4xl font-black leading-none">05+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold mt-1 text-center leading-tight">
                Years of <br/> Excellence
              </span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-black text-sm tracking-[0.3em] uppercase mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-8 leading-tight text-slate-900">
              Bringing Your <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Digital Vision</span> to Life
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
              Bosswebber is a premier scalable freelance tech agency founded by Bosco Niyitegeka. 
              Operating from Rwanda and serving clients worldwide, we transform ideas into powerful digital products.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "High-conversion digital products",
                "Accessible professional tech services",
                "Scalable development for global growth"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-700 font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-slate-500 italic mb-8 border-l-4 border-primary/30 pl-6 py-2">
              "Your growth is our blueprint. We don't just build websites; we build engines for your business success."
            </p>

            {/* Signature & Founder Info */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                <img src="/images/bosco1.jpeg" alt="Bosco Niyitegeka" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Bosco Niyitegeka</h4>
                <p className="text-primary text-sm font-bold uppercase tracking-wider">Founder & Lead Dev</p>
                {/* Stylized Signature Text */}
                <span className="inline-block mt-2 text-2xl text-slate-400 opacity-60 select-none font-signature">
                  Bosco Niyitegeka
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
