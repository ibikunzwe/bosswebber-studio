import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Layout, CheckCircle, Headphones } from "lucide-react";

function Counter({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  {
    label: "Projects Completed",
    value: 50,
    suffix: "+",
    icon: Layout,
  },
  {
    label: "Global Clients",
    value: 30,
    suffix: "+",
    icon: Users,
  },
  {
    label: "Satisfaction Rate",
    value: 100,
    suffix: "%",
    icon: CheckCircle,
  },
  {
    label: "Expert Support",
    value: 24,
    suffix: "/7",
    icon: Headphones,
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-[#0f172a] text-white overflow-hidden relative">
      {/* Decorative pulse background */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group hover:bg-primary/20 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 flex items-center">
                <Counter value={stat.value} />
                <span className="text-primary ml-1">{stat.suffix}</span>
              </div>
              <span className="text-slate-400 font-medium uppercase tracking-widest text-xs md:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
