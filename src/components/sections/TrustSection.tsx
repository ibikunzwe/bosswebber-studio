import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Shield, Clock, RefreshCw, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const guarantees = [
  {
    icon: RefreshCw,
    title: "3 Free Revisions",
    description: "All packages include 3 free revisions during design and development phases to ensure you're completely satisfied.",
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "If you're not satisfied with our work within 7 days of delivery, we'll refund your deposit—no questions asked.",
  },
  {
    icon: Clock,
    title: "Delivery Time Guarantee",
    description: "We commit to delivering your project on time. If we miss the deadline, you get 10% off your final payment.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    description: "Every project undergoes rigorous testing before launch to ensure it meets our high standards and your expectations.",
  },
];

export function TrustSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Trust & <span className="text-gradient">Transparency</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We stand behind our work with clear guarantees and transparent processes. 
            Your success is our commitment.
          </p>
        </motion.div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-none h-full hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <guarantee.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{guarantee.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {guarantee.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 glass-card px-8 py-4 rounded-full">
            <Shield className="w-6 h-6 text-accent" />
            <span className="font-semibold">
              Backed by our commitment to excellence and your satisfaction
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

