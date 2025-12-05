import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Calendar, Clock, Video, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const consultationTypes = [
  { id: "video", label: "Video Call (Google Meet)", icon: Video },
  { id: "whatsapp", label: "WhatsApp Call", icon: MessageSquare },
  { id: "phone", label: "Phone Call", icon: Phone },
];

export function ConsultationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Consultation Requested!",
      description: "We'll confirm your booking within 24 hours via email.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
    setSelectedType("");
  };

  return (
    <section id="consultation" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Let's Talk
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Book a Free <span className="text-gradient">Consultation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule a 15-minute call to discuss your project. No obligations, 
            just a friendly chat about your ideas and how we can help.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 rounded-xl">
              <Calendar className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold mb-2">Free & No Obligation</h3>
              <p className="text-muted-foreground text-sm">
                Get expert advice without any commitment or hidden costs.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Clock className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold mb-2">15-Minute Session</h3>
              <p className="text-muted-foreground text-sm">
                Quick and focused consultation to understand your needs and provide initial guidance.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <Video className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold mb-2">Your Preferred Method</h3>
              <p className="text-muted-foreground text-sm">
                Choose video call, WhatsApp, or regular phone call—whatever works for you.
              </p>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">Full Name *</Label>
                  <Input
                    id="booking-name"
                    placeholder="Your name"
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-email">Email *</Label>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booking-phone">Phone/WhatsApp *</Label>
                  <Input
                    id="booking-phone"
                    placeholder="+250..."
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Date *</Label>
                  <Input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Time *</Label>
                  <Select required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot} (CAT)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Call Method *</Label>
                  <Select value={selectedType} onValueChange={setSelectedType} required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="How to contact you" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-topic">What would you like to discuss?</Label>
                <Textarea
                  id="booking-topic"
                  placeholder="Briefly describe your project or questions..."
                  className="bg-background/50 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Request Consultation"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We'll confirm your booking via email within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
