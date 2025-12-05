import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Download, FileText, CheckSquare, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    icon: FileText,
    title: "Company Profile PDF",
    description: "Download our professional company profile with services, portfolio highlights, and contact information.",
    action: "Download PDF",
    href: "#",
  },
  {
    icon: CheckSquare,
    title: "Website Preparation Checklist",
    description: "10 essential things to prepare before building your website. Free guide to help you get started.",
    action: "Download Checklist",
    href: "#",
  },
  {
    icon: BookOpen,
    title: "Web Development Guide",
    description: "Learn about the web development process, technologies we use, and what to expect.",
    action: "Read Guide",
    href: "#",
  },
];

export function ResourcesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = (resourceType: string) => {
    // In a real implementation, this would trigger a download
    // For now, we'll show a toast or open a link
    console.log(`Downloading ${resourceType}`);
    // You can implement actual download logic here
  };

  return (
    <section id="resources" className="py-24 relative overflow-hidden bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Free Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Helpful <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Download free resources to help you prepare for your project and learn more about our services.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-none h-full hover:border-accent/30 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                    <resource.icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="heroOutline"
                    className="w-full"
                    onClick={() => handleDownload(resource.title)}
                    asChild
                  >
                    <a href={resource.href}>
                      {resource.action}
                      <ArrowRight size={16} className="ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need more information? Let's discuss your project.
          </p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

