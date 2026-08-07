import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Briefcase,
  ShoppingCart,
  UtensilsCrossed,
  Building2,
  GraduationCap,
  HeartPulse,
  Rocket,
  Image as ImageIcon,
  Hotel,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectRequestForm } from "@/components/ProjectRequestForm";

interface Template {
  title: string;
  category: string;
  image: string;
  color: string;
  icon: LucideIcon;
}

const templates: Template[] = [
  { title: "Business Website", category: "Corporate", image: "/images/templates/business.jpg", color: "from-blue-500/30 to-cyan-500/30", icon: Briefcase },
  { title: "E-commerce Store", category: "Online Shop", image: "/images/templates/ecommerce.jpg", color: "from-orange-500/30 to-amber-500/30", icon: ShoppingCart },
  { title: "Restaurant", category: "Food & Dining", image: "/images/templates/restaurant.jpg", color: "from-rose-500/30 to-red-500/30", icon: UtensilsCrossed },
  { title: "Hotel & Tourism", category: "Hospitality", image: "/images/templates/hotel.jpg", color: "from-teal-500/30 to-emerald-500/30", icon: Hotel },
  { title: "Real Estate", category: "Property Listings", image: "/images/templates/real-estate.jpg", color: "from-indigo-500/30 to-blue-500/30", icon: Building2 },
  { title: "School & Education", category: "E-Learning", image: "/images/templates/education.jpg", color: "from-yellow-500/30 to-orange-500/30", icon: GraduationCap },
  { title: "Medical & Clinic", category: "Healthcare", image: "/images/templates/medical.jpg", color: "from-sky-500/30 to-cyan-500/30", icon: HeartPulse },
  { title: "Portfolio", category: "Personal Brand", image: "/images/templates/portfolio.jpg", color: "from-fuchsia-500/30 to-purple-500/30", icon: ImageIcon },
  { title: "Landing Page", category: "SaaS & Startups", image: "/images/templates/landing.jpg", color: "from-primary/30 to-accent/30", icon: Rocket },
];

function TemplateCard({
  template,
  index,
  isInView,
  onSelect,
  onPreview,
}: {
  template: Template;
  index: number;
  isInView: boolean;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = template.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Preview area */}
      <div
        role={imageFailed ? undefined : "button"}
        tabIndex={imageFailed ? undefined : 0}
        onClick={() => !imageFailed && onPreview(template)}
        onKeyDown={(e) => {
          if (!imageFailed && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onPreview(template);
          }
        }}
        aria-label={imageFailed ? undefined : `View ${template.title} full size`}
        className={`relative aspect-[4/3] bg-gradient-to-br ${template.color} flex items-center justify-center overflow-hidden ${
          imageFailed ? "" : "cursor-zoom-in"
        }`}
      >
        {!imageFailed && (
          <img
            src={template.image}
            alt={`${template.title} template preview`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        {imageFailed && (
          <div className="flex flex-col items-center gap-3 text-slate-700/70">
            <Icon className="w-10 h-10" strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-widest">Preview Coming Soon</span>
          </div>
        )}

        {/* Zoom affordance */}
        {!imageFailed && (
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            <ZoomIn className="w-4 h-4 text-slate-700" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            Get This Style
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-900">{template.title}</h3>
        <p className="text-xs text-slate-500">{template.category}</p>
      </div>
    </motion.div>
  );
}

export function TemplatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  return (
    <section id="templates" className="section-padding relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Website Styles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-slate-900">
            Pick a <span className="gradient-text">Style</span>, We'll Customize It For You
          </h2>
          <p className="text-muted-foreground text-lg">
            Style references across industries to help you picture what's possible. Every Bosswebber project is
            100% custom-built and designed around your brand — not a copy-paste template.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={template.title}
              template={template}
              index={index}
              isInView={isInView}
              onSelect={setSelectedTemplate}
              onPreview={setPreviewTemplate}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Get the {selectedTemplate?.title} style</DialogTitle>
            <DialogDescription>
              Tell us a bit about your project and we'll prepare a custom quote inspired by this style.
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <ProjectRequestForm
              initialProjectType="Website Development"
              initialMessage={`I'm interested in a ${selectedTemplate.title} (${selectedTemplate.category}) style website. Please prepare a custom quote.`}
              onSuccess={() => setSelectedTemplate(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Full-size Image Lightbox */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl p-0 overflow-hidden bg-black/95 border-none text-white">
          <DialogHeader className="sr-only">
            <DialogTitle>{previewTemplate?.title} full-size preview</DialogTitle>
            <DialogDescription>{previewTemplate?.category}</DialogDescription>
          </DialogHeader>
          {previewTemplate && (
            <>
              <img
                src={previewTemplate.image}
                alt={`${previewTemplate.title} template preview, full size`}
                className="w-full max-h-[85vh] object-contain"
              />
              <div className="p-4 flex items-center justify-between gap-4 bg-black/60">
                <div>
                  <h3 className="font-bold text-white">{previewTemplate.title}</h3>
                  <p className="text-xs text-white/60">{previewTemplate.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
                >
                  Get This Style
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
