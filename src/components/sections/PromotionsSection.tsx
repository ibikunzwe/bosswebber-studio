import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const promotions = [
  {
    id: 1,
    image: "/images/Marketing Poster.png",
    alt: "Marketing Poster Promotion",
    title: "Level Up Your Business",
    description: "Discover our comprehensive digital marketing and web solutions.",
  },
  {
    id: 2,
    image: "/images/Web Development Service Instagram Post.png",
    alt: "Web Development Services",
    title: "Professional Web Development",
    description: "Launch your custom, high-performance website in weeks, not months.",
  },
  {
    id: 3,
    image: "/images/Website Development Specialist.png",
    alt: "Website Development Specialist",
    title: "Partner with Specialists",
    description: "Work with proven experts to craft your perfect online presence.",
  },
  {
    id: 4,
    image: "/images/ads1.jpeg",
    alt: "Special Advertisement",
    title: "Limited Time Offers",
    description: "Take advantage of our current discounts and kickstart your project! Use code BOSS20 at checkout.",
  },
];

export function PromotionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="promotions" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-primary/5 skewed-bg -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Special Offers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Current <span className="text-gradient">Promotions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Check out our latest packages, special discounts, and featured services designed to accelerate your growth.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {promotions.map((promo) => (
                <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-2 h-full">
                    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group">
                      <div className="relative aspect-video sm:aspect-square md:aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={promo.image}
                          alt={promo.alt}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <Button 
                            variant="hero" 
                            className="w-full"
                            onClick={() => document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" })}
                          >
                            Claim Offer
                          </Button>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {promo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
        
        {/* Mobile Call to Action (since hover overlay isn't friendly on mobile) */}
        <div className="mt-10 text-center sm:hidden">
            <Button 
              variant="heroOutline" 
              size="lg"
              onClick={() => document.getElementById("estimator")?.scrollIntoView({ behavior: "smooth" })}
            >
              Estimate Your Project Cost
            </Button>
        </div>

      </div>
    </section>
  );
}
