import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Starter",
    price: "150,000 - 300,000",
    priceRange: true,
    currency: "RWF",
    description: "Perfect for landing pages & portfolios",
    icon: Zap,
    features: [
      "Up to 5 pages",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "Social media links",
      "1 month free support",
      "3 free revisions",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "400,000 - 700,000",
    priceRange: true,
    currency: "RWF",
    description: "Ideal for business websites & multi-page sites",
    icon: Star,
    features: [
      "Up to 10 pages",
      "Custom UI/UX design",
      "Advanced SEO optimization",
      "Blog integration",
      "Analytics setup",
      "Speed optimization",
      "3 months free support",
      "3 free revisions",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom Quote",
    priceRange: false,
    currency: "",
    description: "E-commerce, custom apps & complex solutions",
    icon: Crown,
    features: [
      "Unlimited pages",
      "E-commerce functionality",
      "Payment integration",
      "Custom features",
      "Admin dashboard",
      "Priority support",
      "6 months free support",
      "3 free revisions",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" ref={ref}>
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
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Choose Your <span className="text-gradient">Perfect Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Clear, upfront pricing with no hidden fees. Need something custom? 
            Request a personalized quote.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? "bg-gradient-to-b from-accent/20 to-accent/5 border-2 border-accent"
                  : "glass-card"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <tier.icon className={`w-12 h-12 mx-auto mb-4 ${tier.popular ? "text-accent" : "text-primary"}`} />
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`${tier.priceRange ? "text-3xl" : "text-2xl"} font-bold`}>{tier.price}</span>
                  {tier.currency && <span className="text-muted-foreground">{tier.currency}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "hero" : "heroOutline"}
                className="w-full"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need something more custom? Let's discuss your specific requirements.
          </p>
          <Button
            variant="glass"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
