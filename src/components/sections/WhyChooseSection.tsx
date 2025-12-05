import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, 
  Palette, 
  DollarSign, 
  Code2, 
  HeadphonesIcon, 
  MessageCircle 
} from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We work efficiently to deliver your project on time without compromising quality.",
  },
  {
    icon: Palette,
    title: "Custom Designs",
    description: "Every project gets a unique, modern design tailored to your brand identity.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description: "Quality work at competitive rates with flexible payment options.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description: "Well-structured, maintainable code that scales with your business.",
  },
  {
    icon: HeadphonesIcon,
    title: "Great Support",
    description: "Ongoing assistance and quick response times when you need help.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Work directly with the developer for clear, efficient collaboration.",
  },
];

export function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            The <span className="gradient-text">Bosswebber</span> Advantage
          </h2>
          <p className="text-muted-foreground text-lg">
            We're committed to delivering exceptional results that exceed your expectations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <reason.icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
