import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Phone, FileText, CreditCard, Palette, Code, Eye, Rocket, Wrench } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "Free consultation to understand your goals, target audience, and project requirements.",
    icon: Phone,
  },
  {
    number: "02",
    title: "Proposal & Quote",
    description: "Detailed plan with pricing, timeline, and deliverables tailored to your needs.",
    icon: FileText,
  },
  {
    number: "03",
    title: "50% Deposit",
    description: "Project starts once deposit is received. Secure your spot and let's begin!",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Design Phase",
    description: "Creating mockups and visual designs for your approval before development begins.",
    icon: Palette,
  },
  {
    number: "05",
    title: "Development",
    description: "Building your product with clean, modern code and industry best practices.",
    icon: Code,
  },
  {
    number: "06",
    title: "Review & Revisions",
    description: "You review the work and provide feedback. Up to 3 free revisions included.",
    icon: Eye,
  },
  {
    number: "07",
    title: "Launch",
    description: "We deploy your project and ensure everything goes live smoothly!",
    icon: Rocket,
  },
  {
    number: "08",
    title: "Support",
    description: "Post-launch care and ongoing support to ensure your success.",
    icon: Wrench,
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent, step-by-step approach that keeps you informed and involved 
            throughout your project journey.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6 mb-12 last:mb-0"
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-accent to-transparent" />
              )}

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <step.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Content */}
              <div className="flex-1 glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent font-mono text-sm">{step.number}</span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-full">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent" />
            </div>
            <span className="font-semibold">3 Free Revisions Guaranteed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
