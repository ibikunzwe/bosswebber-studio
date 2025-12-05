import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Bosswebber transformed our outdated website into a modern, user-friendly platform. The attention to detail and commitment to quality exceeded our expectations.",
    rating: 5,
    avatar: "/images/admin image.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, FitLife App",
    content: "The mobile app they built for us has been a game-changer. Professional, responsive, and incredibly talented. Highly recommend!",
    rating: 5,
    avatar: "/images/user in tasks.png",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    content: "Working with Bosco was a pleasure. Clear communication, fast delivery, and the final product was exactly what we envisioned.",
    rating: 5,
    avatar: "/images/admin image.png",
  },
  {
    id: 4,
    name: "David Okonkwo",
    role: "Restaurant Owner",
    content: "Our online ordering system has increased sales by 40%. The team understood our needs perfectly and delivered beyond expectations.",
    rating: 5,
    avatar: "/images/user in tasks.png",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it – hear from the businesses we've helped succeed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full glass-card rounded-2xl p-6 relative">
                <Quote size={40} className="absolute top-6 right-6 text-primary/20" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-foreground/90 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
