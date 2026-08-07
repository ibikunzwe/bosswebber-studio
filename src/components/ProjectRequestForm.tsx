import { useState } from "react";
import { Send } from "lucide-react";
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

interface ProjectRequestFormProps {
  initialProjectType?: string;
  initialMessage?: string;
  onSuccess?: () => void;
}

export function ProjectRequestForm({
  initialProjectType = "",
  initialMessage = "",
  onSuccess,
}: ProjectRequestFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    projectType: initialProjectType,
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
      onSuccess?.();
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

      // Send notification email to Bosswebber
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

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
      onSuccess?.();
    } catch (error: any) {
      console.error("Email sending failed - Full error:", error);

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
          defaultValue={initialMessage}
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
  );
}
