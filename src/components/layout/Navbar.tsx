import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Cloud, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services", hasDropdown: true },
  { name: "About", href: "#about" },
  { name: "Blog", href: "#blog" },
  { name: "Styles", href: "#styles" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-transparent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs py-2 opacity-90">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            <span>Serving Global Clients from Kigali, Rwanda</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-primary" />
            <span>Contact Us Today <span className="text-primary font-semibold">+250 785 726 750</span></span>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 lg:top-[33px] ${
          isScrolled
            ? "glass-card border-b border-border/50"
            : "bg-transparent border-b border-white/10 lg:border-none"
        }`}
      >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-white">
            <Cloud size={32} strokeWidth={1.5} />
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8 ml-auto mr-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm flex items-center gap-1"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="opacity-70" />}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="outline" className="text-white border-white/50 bg-transparent hover:bg-white hover:text-black rounded-none px-6 py-5 text-sm uppercase tracking-wider" asChild>
              <a href="#contact">Contact</a>
            </Button>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-card border-t border-border/50"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="outline" className="w-full mt-4 text-white border-white/50 bg-transparent" asChild>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.header>
    </>
  );
}
