import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const projectTypes = [
  "Website Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-commerce Solution",
  "Custom Software",
  "Maintenance & Support",
  "Other",
];

const budgetRanges = [
  "Under 300,000 RWF",
  "300,000 - 600,000 RWF",
  "600,000 - 1,000,000 RWF",
  "1,000,000 - 2,000,000 RWF",
  "Above 2,000,000 RWF",
  "Not sure yet",
];

const timelines = [
  "ASAP (Rush project)",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2-3 months",
  "Flexible / No deadline",
];

// EmailJS Configuration
// You'll need to set these up in your EmailJS account
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "YOUR_AUTOREPLY_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
const RECIPIENT_EMAIL = "ibikunzwe@gmail.com";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    contentReady: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Collect form data (combining FormData with state for Select values)
    const submissionData = {
      from_name: formData.get("name") as string,
      from_email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string || "Not provided",
      project_type: formValues.projectType || formData.get("projectType") as string,
      budget: formValues.budget || formData.get("budget") as string,
      timeline: formValues.timeline || formData.get("timeline") as string,
      industry: formData.get("industry") as string || "Not provided",
      references: formData.get("references") as string || "Not provided",
      content_ready: formValues.contentReady || formData.get("contentReady") as string,
      message: formData.get("message") as string,
      to_email: RECIPIENT_EMAIL,
    };

    // Check if EmailJS is configured
    const isEmailJSConfigured = 
      EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
      EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
      EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY";

    if (!isEmailJSConfigured) {
      // Fallback: Use mailto link if EmailJS is not configured
      const subject = encodeURIComponent(`New Project Request from ${submissionData.from_name}`);
      const body = encodeURIComponent(`
New Project Request

Name: ${submissionData.from_name}
Email: ${submissionData.from_email}
Phone: ${submissionData.phone}
Company: ${submissionData.company}

Project Type: ${submissionData.project_type}
Budget Range: ${submissionData.budget}
Timeline: ${submissionData.timeline}
Industry: ${submissionData.industry}
Content Ready: ${submissionData.content_ready}

Reference Websites: ${submissionData.references}

Project Description:
${submissionData.message}
      `);
      
      window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
      
      toast({
        title: "Opening Email Client",
        description: "Please send the email that opens in your email client.",
      });
      
      setIsSubmitting(false);
      form.reset();
      setFormValues({ projectType: "", budget: "", timeline: "", contentReady: "" });
      return;
    }

    try {
      // Validate required fields
      if (!submissionData.from_name || !submissionData.from_email || !submissionData.phone) {
        throw new Error("Please fill in all required fields");
      }

      // Validate EmailJS configuration
      if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" || EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID" || EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
        throw new Error("EmailJS is not properly configured. Please check your .env file.");
      }

      // Initialize EmailJS with public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Prepare template parameters - ensure all variables match your EmailJS template exactly
      // Note: Variable names must match EXACTLY what's in your EmailJS template (case-sensitive)
      // IMPORTANT: The "to_email" must be set in your EmailJS template settings OR passed here
      const templateParams: Record<string, string> = {
        // Basic contact info
        from_name: String(submissionData.from_name || "Unknown"),
        from_email: String(submissionData.from_email || ""),
        phone: String(submissionData.phone || "Not provided"),
        company: String(submissionData.company || "Not provided"),
        
        // Project details
        project_type: String(submissionData.project_type || "Not specified"),
        budget: String(submissionData.budget || "Not specified"),
        timeline: String(submissionData.timeline || "Not specified"),
        industry: String(submissionData.industry || "Not provided"),
        references: String(submissionData.references || "Not provided"),
        content_ready: String(submissionData.content_ready || "Not specified"),
        message: String(submissionData.message || "No description provided"),
        
        // Email settings - These are critical for EmailJS
        // Option 1: Set to_email in template params (if template uses {{to_email}})
        to_email: RECIPIENT_EMAIL,
        to_name: "Bosswebber",
        reply_to: String(submissionData.from_email || ""),
        
        // Option 2: Some EmailJS templates need these alternative field names
        user_email: RECIPIENT_EMAIL,
        user_name: "Bosswebber",
      };

      // Log for debugging (remove in production)
      console.log("Sending email with params:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        params: templateParams,
      });

      // Send notification email to Bosswebber
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS Response:", response);

      // Send auto-reply to client (if auto-reply template is configured)
      const isAutoReplyConfigured = EMAILJS_AUTOREPLY_TEMPLATE_ID !== "YOUR_AUTOREPLY_TEMPLATE_ID";
      if (isAutoReplyConfigured && submissionData.from_email) {
        try {
          const autoReplyParams = {
            to_email: submissionData.from_email,
            to_name: submissionData.from_name || "Valued Client",
            from_name: "Bosswebber",
            from_email: RECIPIENT_EMAIL,
            project_type: submissionData.project_type || "Your Project",
            budget: submissionData.budget || "To be discussed",
            timeline: submissionData.timeline || "To be discussed",
          };
          
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTOREPLY_TEMPLATE_ID,
            autoReplyParams,
            EMAILJS_PUBLIC_KEY
          );
        } catch (autoReplyError) {
          // Don't fail the whole submission if auto-reply fails
          console.warn("Auto-reply failed (non-critical):", autoReplyError);
        }
      }
    
    toast({
      title: "Project Request Sent!",
        description: "Thank you! We've received your request and will get back to you within 24 hours. Check your email for confirmation.",
      });

      form.reset();
      setFormValues({ projectType: "", budget: "", timeline: "", contentReady: "" });
    } catch (error: any) {
      console.error("Email sending failed - Full error:", error);
      console.error("Error status:", error?.status);
      console.error("Error text:", error?.text);
      
      // Provide more specific error messages
      let errorMessage = "There was an error sending your request.";
      let errorDetails = "";
      
      if (error?.status === 422) {
        errorMessage = "Email configuration error (422)";
        errorDetails = "This usually means template variables don't match. Check your EmailJS template variables match exactly: from_name, from_email, phone, company, project_type, budget, timeline, industry, references, content_ready, message";
      } else if (error?.status === 400) {
        errorMessage = "Invalid request (400)";
        errorDetails = "Please check that all required fields are filled correctly.";
      } else if (error?.status === 401) {
        errorMessage = "Authentication error (401)";
        errorDetails = "Your EmailJS Public Key might be incorrect. Check your .env file.";
      } else if (error?.status === 404) {
        errorMessage = "Service not found (404)";
        errorDetails = "Your Service ID or Template ID might be incorrect. Check your .env file.";
      } else if (error?.text) {
        // EmailJS provides error details in error.text
        errorDetails = error.text;
        if (error.text.includes("Invalid template")) {
          errorMessage = "Template configuration error";
          errorDetails = "Template ID might be wrong or template variables don't match.";
        } else if (error.text.includes("Invalid service")) {
          errorMessage = "Service configuration error";
          errorDetails = "Service ID might be wrong or service is not active.";
        }
      } else if (error?.message) {
        errorDetails = error.message;
      }
      
      toast({
        title: errorMessage,
        description: errorDetails + " You can also contact us directly at bosswebberinfo@gmail.com or +250 785 726 750",
        variant: "destructive",
    });
    } finally {
    setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Start Your Project
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Request a <span className="text-gradient">Quote</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your project and we'll get back to you within 24 hours with a custom proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:bosswebberinfo@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <span className="font-medium group-hover:text-accent transition-colors">
                      bosswebberinfo@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/250785726750"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp / Phone</p>
                    <span className="font-medium group-hover:text-accent transition-colors">
                      +250 785 726 750
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <span className="font-medium">Rwanda • Available Worldwide</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold text-xs text-center leading-tight">MTN<br/>MOMO</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">MTN Mobile Money Payment</p>
                    <span className="font-medium tracking-wide block mb-0.5">CODE: <span className="text-accent">1964758</span></span>
                    <span className="text-xs text-muted-foreground block shadow-sm">Dial *182*8*1*1964758# and follow instructions.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-accent" />
                <h4 className="font-bold">Prefer to Chat?</h4>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Get instant responses on WhatsApp. We're usually online and ready to help!
              </p>
              <Button variant="hero" className="w-full" asChild>
                <a
                  href="https://wa.me/250785726750?text=Hi%20Bosswebber!%20I'm%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Project Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold mb-2">Tell Us About Your Project</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Fill out the form below and we'll prepare a custom quote for you.
              </p>

              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="your@email.com"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone / WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    maxLength={20}
                    placeholder="+250..."
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Business (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    maxLength={100}
                    placeholder="Your business name"
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Type *</Label>
                  <Select 
                    name="projectType" 
                    required
                    value={formValues.projectType}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, projectType: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget Range *</Label>
                  <Select 
                    name="budget" 
                    required
                    value={formValues.budget}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timeline *</Label>
                  <Select 
                    name="timeline" 
                    required
                    value={formValues.timeline}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, timeline: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="When do you need it?" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline} value={timeline}>
                          {timeline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Your Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    maxLength={100}
                    placeholder="e.g., Healthcare, Education..."
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="references">Reference Websites (Optional)</Label>
                <Input
                  id="references"
                  name="references"
                  maxLength={500}
                  placeholder="Links to websites you like (separate with commas)"
                  className="bg-background/50"
                />
                </div>
                <div className="space-y-2">
                  <Label>Do you have content ready? *</Label>
                  <Select 
                    name="contentReady" 
                    required
                    value={formValues.contentReady}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, contentReady: value }))}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I have all content</SelectItem>
                      <SelectItem value="partially">Partially ready</SelectItem>
                      <SelectItem value="no">No, I need help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Description *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  maxLength={2000}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  className="bg-background/50 min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending Request..."
                ) : (
                  <>
                    Submit Project Request
                    <Send size={18} />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We'll respond within 24 hours with a custom proposal.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
