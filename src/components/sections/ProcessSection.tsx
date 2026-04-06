import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { UploadCloud, Search, Code2, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Upload & Share Your Vision",
    description: "Share your ideas, requirements, or existing designs with us. We evaluate your goals to create a strategic roadmap tailored to your business format.",
    icon: UploadCloud,
  },
  {
    number: "02",
    title: "Review and Analysis",
    description: "We perform an extensive analysis of your target audience and technical requirements to ensure a rock-solid foundation for development.",
    icon: Search,
  },
  {
    number: "03",
    title: "Pixel Perfect Code",
    description: "Our developers create fresh, semantically structured, and pixel-perfect coded replicas of your design, ensuring maximum security, performance, and SEO compliance.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Testing and Delivery",
    description: "All output is tested extensively across multiple real devices by our QC team to ensure zero errors, blazing-fast loading speeds, and a flawless product delivery.",
    icon: CheckCircle2,
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-32 relative overflow-hidden bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header content unchanged ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Our <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Design to Web</span> Process
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto font-medium">
            A transparent, 4-step methodology inspired by industry standards to ensure fast, secure, and highly optimized digital solutions.
          </p>
        </motion.div>

        {/* Process Steps with Connecting Line */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal Connecting Line (Desktop Only) */}
          <div className="absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-primary/20 hidden lg:block z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-white border-2 border-primary/20 flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] bg-white mx-auto lg:mx-0">
                  <div className="absolute inset-2 rounded-full border border-dashed border-primary/10 group-hover:rotate-180 transition-transform duration-1000" />
                  <step.icon className="w-10 h-10 text-primary transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-900 text-center lg:text-left transition-colors group-hover:text-primary leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-center lg:text-left font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner ... */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 max-w-5xl mx-auto rounded-[2rem] p-1 bg-gradient-to-r from-primary to-accent overflow-hidden"
        >
          <div className="bg-white flex flex-col md:flex-row items-center justify-between gap-8 p-10 lg:p-14 rounded-[1.9rem]">
            <div className="max-w-xl">
              <h4 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">Ready for <span className="text-primary font-black">Pixel-Perfect</span> Results?</h4>
              <p className="text-slate-500 text-lg font-medium italic">"Every project starts with fresh code to ensure maximum performance, security, and scalability for your future growth."</p>
            </div>
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/20 group h-16 px-10" asChild>
              <a href="#contact" className="gap-3">
                <span className="font-bold tracking-wide">START YOUR PROJECT</span>
                <CheckCircle2 className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
