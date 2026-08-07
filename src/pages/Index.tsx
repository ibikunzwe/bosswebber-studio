import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TemplatesSection } from "@/components/sections/TemplatesSection";
import { PromotionsSection } from "@/components/sections/PromotionsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CostEstimatorSection } from "@/components/sections/CostEstimatorSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  // Add FAQ structured data for SEO
  useEffect(() => {
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take to build a website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Timeline depends on complexity. A basic website takes 1-2 weeks, professional sites 2-4 weeks, and enterprise/e-commerce projects 4-8 weeks. We'll provide a specific timeline during our initial consultation."
          }
        },
        {
          "@type": "Question",
          "name": "What do I need to provide to get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We'll need your brand assets (logo, colors), content (text, images), and a clear idea of your goals. Don't worry if you don't have everything ready—we can guide you through the process and even help create content."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide hosting and domain services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We help you set up hosting and domain registration with reliable providers. While we don't host directly, we'll manage the entire setup process and ensure everything runs smoothly."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after my website is launched?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depending on your package, you get 1-6 months of free support. This includes bug fixes, minor updates, and technical assistance. After that, we offer affordable maintenance plans."
          }
        },
        {
          "@type": "Question",
          "name": "Can I update the website myself after launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! We build with user-friendly content management systems. We'll provide training on how to update your content, add blog posts, and manage basic changes independently."
          }
        },
        {
          "@type": "Question",
          "name": "What payment methods do you accept?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept Mobile Money (MTN MOMO CODE: 1964758 - Dial *182*8*1*1964758# and follow instructions, Airtel), bank transfers, and international payments via PayPal. Payment is typically split: 50% upfront to start and 50% upon completion."
          }
        },
        {
          "@type": "Question",
          "name": "How many revisions do I get?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All packages include 3 free revisions during the design and development phases. This ensures you're completely satisfied with the final result before launch."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with clients outside Rwanda?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We work with clients globally. All communication can be done via video calls, WhatsApp, and email. We're experienced in managing remote projects effectively."
          }
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqStructuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main role="main">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <StatsSection />
        <TrustSection />
        <ServicesSection />
        <TemplatesSection />
        <PortfolioSection />
        <WhyChooseSection />
        <ProcessSection />
        <PromotionsSection />
        <PricingSection />
        <CostEstimatorSection />
        <TestimonialsSection />
        <FAQSection />
        <ResourcesSection />
        <ConsultationSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
