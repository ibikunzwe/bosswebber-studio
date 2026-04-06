import { motion } from "framer-motion";
import { Star } from "lucide-react";

const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-4 mx-4 sm:mx-8">
    <span className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 uppercase tracking-wider whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
      {text}
    </span>
    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 opacity-50" />
  </div>
);

export function MarqueeSection() {
  const items = [
    "WEB DESIGN",
    "BRANDING",
    "UI/UX EXPERIENCES",
    "E-COMMERCE",
    "CUSTOM APPS",
    "SEO & MARKETING",
    "DIGITAL STRATEGY",
  ];

  // We duplicate the array to ensure seamless infinite scrolling
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-12 bg-[#0a0715] border-y border-white/5 overflow-hidden flex relative z-30">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0a0715] via-transparent to-[#0a0715] w-full" />
      
      {/* Adding custom keyframes inline via arbitrary values or a custom class if we had it, but for reliable infinite marquee we can rely on standard CSS animations. 
          To do it easily via Tailwind without touching tailwind.config.ts, we can use inline styles with standard CSS animations. */}
      <style>
        {`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            display: flex;
            width: max-content;
            animation: marquee-scroll 30s linear infinite;
          }
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="animate-marquee-scroll flex items-center">
        {marqueeItems.map((item, idx) => (
          <MarqueeItem key={idx} text={item} />
        ))}
      </div>
    </section>
  );
}
