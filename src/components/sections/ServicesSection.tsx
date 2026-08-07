import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  Mail,
  Server,
  Share2,
  LineChart,
  Wrench,
  Globe,
  RefreshCw,
  DatabaseBackup,
  Gauge,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  HeadphonesIcon,
  BadgeCheck,
  Palette
} from "lucide-react";

const websiteTypes = [
  "Business Websites",
  "E-commerce Websites",
  "NGO & Non-Profit Websites",
  "School Websites",
  "Church Websites",
  "Real Estate Websites",
  "Portfolio Websites",
  "Blog & News Websites",
  "Multivendor Websites",
  "Hotel & Tourism Websites",
  "Medical / Clinic Websites",
  "Restaurant Websites",
  "Landing Pages",
  "Web Systems / Platforms",
  "Agriculture Websites",
  "Education & E-learning",
  "Personal Brand Websites"
];

const myServices = [
  { icon: Globe, title: "Make New Website" },
  { icon: Palette, title: "Graphic Design & Logo Maker" },
  { icon: RefreshCw, title: "Web Redesign" },
  { icon: DatabaseBackup, title: "Backup, Cloning & Migration" },
  { icon: Gauge, title: "Performance & SEO" },
  { icon: ShieldCheck, title: "Web Security & SSL Certificate" },
  { icon: ShoppingCart, title: "Ecommerce Web" },
  { icon: Smartphone, title: "Mobile Design" },
  { icon: HeadphonesIcon, title: "24/7 Technical Support" },
  { icon: BadgeCheck, title: "Money Back Guarantee*" },
];

const freeServices = [
  { icon: Mail, title: "Business Emails" },
  { icon: Server, title: "Website Hosting" },
  { icon: Share2, title: "Social Media Setup" },
  { icon: LineChart, title: "SEO & Google Ads" },
  { icon: Wrench, title: "Maintenance & Support" },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto" ref={ref}>
        {/* Core Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 font-bold rounded-full text-sm tracking-wider mb-4 border border-green-200">
            WE DESIGN & DEVELOP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-6 text-slate-900">
            ALL KIND OF <span className="text-primary">WEBSITES</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Website design, graphic design, and logo maker services in Kigali, Rwanda. Whether you need a simple landing page or a complex web platform, we deliver fast, secure, and professional solutions tailored to your industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-20">
          {websiteTypes.map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <span className="font-medium text-slate-700">{type}</span>
            </motion.div>
          ))}
        </div>

        {/* My Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm tracking-wider mb-4 border border-primary/20">
            WHAT I OFFER
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-6 text-slate-900">
            My <span className="text-primary">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {myServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center text-center gap-3 bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-slate-700 text-sm leading-tight">{service.title}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-slate-400 text-xs text-center mb-20">
          *Terms and conditions apply to the money back guarantee.
        </p>

        {/* Free Additional Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary/5 border border-primary/20 rounded-3xl p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 uppercase">
            Additional Services We Provide For <span className="text-orange-500">FREE</span>
          </h3>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto">
            When you build your website with Bosswebber, we include these essential services at absolutely no extra cost to jumpstart your business.
          </p>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {freeServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-4 group max-w-[140px]"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white group-hover:border-primary/20 transition-all duration-300 transform group-hover:-translate-y-2">
                  <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-bold text-slate-800 text-center leading-tight">
                  {service.title}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
