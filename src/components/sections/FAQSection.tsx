import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Timeline depends on complexity. A basic website takes 1-2 weeks, professional sites 2-4 weeks, and enterprise/e-commerce projects 4-8 weeks. We'll provide a specific timeline during our initial consultation.",
  },
  {
    question: "What do I need to provide to get started?",
    answer: "We'll need your brand assets (logo, colors), content (text, images), and a clear idea of your goals. Don't worry if you don't have everything ready—we can guide you through the process and even help create content.",
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "We help you set up hosting and domain registration with reliable providers. While we don't host directly, we'll manage the entire setup process and ensure everything runs smoothly.",
  },
  {
    question: "What happens after my website is launched?",
    answer: "Depending on your package, you get 1-6 months of free support. This includes bug fixes, minor updates, and technical assistance. After that, we offer affordable maintenance plans.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer: "Absolutely! We build with user-friendly content management systems. We'll provide training on how to update your content, add blog posts, and manage basic changes independently.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN, Airtel), bank transfers, and international payments via PayPal. Payment is typically split: 50% upfront to start and 50% upon completion.",
  },
  {
    question: "How many revisions do I get?",
    answer: "All packages include 3 free revisions during the design and development phases. This ensures you're completely satisfied with the final result before launch.",
  },
  {
    question: "Do you work with clients outside Rwanda?",
    answer: "Yes! We work with clients globally. All communication can be done via video calls, WhatsApp, and email. We're experienced in managing remote projects effectively.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and pricing.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="https://wa.me/250785726750?text=Hi%20Bosswebber!%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline font-semibold"
          >
            Chat with us on WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
