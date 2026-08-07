import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, GraduationCap, HeartPulse, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";

// Function to get appropriate image based on project name and category
const getProjectImage = (title: string, category: string): string => {
  const titleLower = title.toLowerCase();
  const categoryLower = category.toLowerCase();

  // Hotel/Hospitality projects
  if (categoryLower.includes("hotel") || categoryLower.includes("hospitality") || titleLower.includes("lounge")) {
    return "/images/Website Development Specialist.png";
  }

  // Educational/School projects
  if (categoryLower.includes("educational") || categoryLower.includes("school") || titleLower.includes("academy") || titleLower.includes("learning")) {
    return "/images/developper in office.png";
  }

  // Content Management/News/Marketing projects
  if (categoryLower.includes("content") || categoryLower.includes("news") || titleLower.includes("farming") || titleLower.includes("zone") || titleLower.includes("marketing")) {
    return "/images/Marketing Poster.png";
  }

  // Event/Venue projects (checked before the generic "management" rule below,
  // since "Event Management" would otherwise match that first)
  if (categoryLower.includes("event") || categoryLower.includes("venue") || titleLower.includes("venue") || titleLower.includes("event")) {
    return "/images/Web Development Service Instagram Post.png";
  }

  // Organization/Choir/Music projects (also checked before the generic
  // "management" rule, since "Organization Management" would match it first)
  if (categoryLower.includes("organization") || titleLower.includes("choir") || titleLower.includes("music")) {
    return "/images/user in tasks.png";
  }

  // Data Management/Admin/System projects
  if (categoryLower.includes("data") || categoryLower.includes("management") || categoryLower.includes("system") || titleLower.includes("dataflow") || titleLower.includes("admin")) {
    return "/images/admin image.png";
  }

  // Web Development projects
  if (categoryLower.includes("web") || categoryLower.includes("development")) {
    return "/images/Web Development Service Instagram Post.png";
  }

  // Default fallback
  return "/images/portfolio picture.png";
};

const projects = [
  {
    id: 1,
    title: "Choice Lounge",
    category: "Hotel Management System",
    description: "Complete hotel booking and management platform with room reservations, event booking, and customer management. Built for premium hospitality businesses with real-time availability and payment integration.",
    image: getProjectImage("Choice Lounge", "Hotel Management System"),
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "BBACADEMY",
    category: "Educational Platform",
    description: "Comprehensive learning management system for schools with course management, student enrollment, progress tracking, and online assessments. Designed to streamline educational operations.",
    image: getProjectImage("BBACADEMY", "Educational Platform"),
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    id: 3,
    title: "Farming Zone News Hub",
    category: "Content Management",
    description: "Agricultural news and information platform with article management, category organization, and user engagement features. Built to serve the farming community with up-to-date information.",
    image: getProjectImage("Farming Zone News Hub", "Content Management"),
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Ifishi Dataflow",
    category: "Data Management System",
    description: "Enterprise data management and workflow system with advanced analytics, reporting, and data processing capabilities. Designed for organizations requiring efficient data handling.",
    image: getProjectImage("Ifishi Dataflow", "Data Management System"),
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Lamennais Venue Flow",
    category: "Event Management",
    description: "Venue booking and event management system with calendar integration, booking management, and customer communication tools. Perfect for event venues and spaces.",
    image: getProjectImage("Lamennais Venue Flow", "Event Management"),
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 6,
    title: "Intama Choir Management",
    category: "Organization Management",
    description: "Choir and music group management platform with member management, event scheduling, and performance tracking. Built to help music organizations manage their operations efficiently.",
    image: getProjectImage("Intama Choir Management", "Organization Management"),
    color: "from-indigo-500/20 to-purple-500/20",
  },
];

const industryHighlights = [
  {
    icon: Hotel,
    title: "Hotels & Hospitality",
    description: "We've built comprehensive management systems for multiple hotels, including booking platforms, room management, event scheduling, and customer relationship management.",
    projects: "Multiple hotel management systems",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: HeartPulse,
    title: "Hospitals & Healthcare",
    description: "Healthcare management systems including patient records, appointment scheduling, staff management, and medical inventory tracking for hospitals and clinics.",
    projects: "Hospital management systems",
    color: "from-red-500/20 to-pink-500/20",
  },
  {
    icon: GraduationCap,
    title: "Schools & Education",
    description: "Educational platforms and learning management systems for schools, including student enrollment, course management, grade tracking, and parent-teacher communication.",
    projects: "School management systems",
    color: "from-purple-500/20 to-violet-500/20",
  },
];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Our <span className="gradient-text">Recent Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of successful projects. We've built custom systems for hotels, 
            hospitals, schools, and various businesses across Rwanda and beyond.
          </p>
        </motion.div>

        {/* Industry Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Trusted by Industry Leaders</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {industryHighlights.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4`}>
                  <industry.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">{industry.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{industry.description}</p>
                <span className="text-primary text-sm font-medium">{industry.projects}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8">Featured Projects</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-2xl glass-card">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} project by Bosswebber`}
                    title={`${project.title} - ${project.category}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-primary text-sm font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-1 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-muted-foreground">View Details</span>
                    <ExternalLink size={14} className="text-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl w-full glass-card rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="aspect-video">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} - ${selectedProject.category} project showcase`}
                title={`${selectedProject.title} - ${selectedProject.category}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-primary text-sm font-medium">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold mt-2 mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              <Button variant="hero" asChild>
                <a href="#contact">Start Similar Project</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
