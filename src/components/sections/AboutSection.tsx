import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Palette, Lightbulb } from "lucide-react";

const expertise = [
  { icon: Code2, label: "Web Development" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Lightbulb, label: "Digital Solutions" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Bringing Your{" "}
              <span className="gradient-text">Digital Vision</span> to Life
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Bosswebber is a freelance tech agency founded by Bosco Niyitegeka, 
              dedicated to helping small businesses and individuals transform their 
              ideas into powerful digital products.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              With years of experience in web and mobile development, we deliver 
              high-quality, custom solutions that drive growth and success. Our mission 
              is to make professional digital services accessible to everyone.
            </p>

            {/* Expertise Grid */}
            <div className="grid grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg glass-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <img
                  src="/images/bosswebber in office.png"
                  alt="Bosco Niyitegeka - Bosswebber web developer working in office, Rwanda web development services"
                  title="Bosswebber - Professional Web Developer in Rwanda"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 glass-card rounded-xl flex items-center justify-center"
              >
                <Code2 size={32} className="text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 glass-card rounded-xl flex items-center justify-center"
              >
                <Smartphone size={24} className="text-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
