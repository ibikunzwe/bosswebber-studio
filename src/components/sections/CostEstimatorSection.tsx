import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Calculator, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const projectTypes = [
  { id: "basic", label: "Basic Website (1-5 pages)", basePrice: 300000 },
  { id: "business", label: "Business Website (6-10 pages)", basePrice: 600000 },
  { id: "ecommerce", label: "E-commerce Store", basePrice: 900000 },
  { id: "webapp", label: "Web Application", basePrice: 1200000 },
  { id: "mobile", label: "Mobile App", basePrice: 1500000 },
];

const addOns = [
  { id: "seo", label: "Advanced SEO Package", price: 100000 },
  { id: "blog", label: "Blog Integration", price: 50000 },
  { id: "analytics", label: "Analytics & Reporting", price: 30000 },
  { id: "multilang", label: "Multi-language Support", price: 80000 },
  { id: "chatbot", label: "Chatbot Integration", price: 70000 },
  { id: "maintenance", label: "1 Year Maintenance Plan", price: 150000 },
];

export function CostEstimatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedType, setSelectedType] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const basePrice = projectTypes.find((t) => t.id === selectedType)?.basePrice || 0;
  const addOnsPrice = selectedAddOns.reduce((sum, id) => {
    const addOn = addOns.find((a) => a.id === id);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = basePrice + addOnsPrice;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-RW").format(price);
  };

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <section id="estimator" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Plan Your Budget
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Cost <span className="text-gradient">Estimator</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get an instant estimate for your project. This is a starting point—
            final pricing depends on specific requirements.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Selection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            {/* Project Type */}
            <div className="mb-8">
              <Label className="text-lg font-semibold mb-4 block">
                <Calculator className="w-5 h-5 inline mr-2 text-accent" />
                Project Type
              </Label>
              <RadioGroup value={selectedType} onValueChange={setSelectedType}>
                {projectTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <Label htmlFor={type.id} className="cursor-pointer">
                        {type.label}
                      </Label>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {formatPrice(type.basePrice)} RWF
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Add-ons */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                Optional Add-ons
              </Label>
              <div className="space-y-3">
                {addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={addOn.id}
                        checked={selectedAddOns.includes(addOn.id)}
                        onCheckedChange={() => handleAddOnToggle(addOn.id)}
                      />
                      <Label htmlFor={addOn.id} className="cursor-pointer">
                        {addOn.label}
                      </Label>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      +{formatPrice(addOn.price)} RWF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl flex flex-col"
          >
            <h3 className="text-xl font-bold mb-6">Your Estimate</h3>

            {/* Breakdown */}
            <div className="flex-1 space-y-4">
              {selectedType && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {projectTypes.find((t) => t.id === selectedType)?.label}
                  </span>
                  <span>{formatPrice(basePrice)} RWF</span>
                </div>
              )}
              
              {selectedAddOns.map((id) => {
                const addOn = addOns.find((a) => a.id === id);
                return addOn ? (
                  <div key={id} className="flex justify-between">
                    <span className="text-muted-foreground">{addOn.label}</span>
                    <span>+{formatPrice(addOn.price)} RWF</span>
                  </div>
                ) : null;
              })}

              {!selectedType && selectedAddOns.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  Select a project type to see your estimate
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Estimated Total</span>
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(totalPrice)} RWF
                </span>
              </div>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>3 free revisions included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>50% upfront, 50% on completion</span>
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Exact Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
