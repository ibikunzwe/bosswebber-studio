import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  X,
  GraduationCap,
  HeartPulse,
  Hotel,
  Newspaper,
  ClipboardList,
  CalendarCheck,
  Music,
  PiggyBank,
  UtensilsCrossed,
  Pill,
  Barcode,
  ClipboardCheck,
  LayoutDashboard,
  CalendarClock,
  QrCode,
  BrainCircuit,
  Wallet,
  Receipt,
  Briefcase,
  ShoppingCart,
  Truck,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: LucideIcon;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Choice Lounge",
    category: "Hotel Management System",
    description: "Complete hotel booking and management platform with room reservations, event booking, and customer management. Built for premium hospitality businesses with real-time availability and payment integration.",
    image: "/images/portfolio/hotel.jpg",
    icon: Hotel,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "BBACADEMY",
    category: "Educational Platform",
    description: "Comprehensive learning management system for schools with course management, student enrollment, progress tracking, and online assessments. Designed to streamline educational operations.",
    image: "/images/portfolio/education.jpg",
    icon: GraduationCap,
    color: "from-purple-500/20 to-violet-500/20",
  },
  {
    id: 3,
    title: "Farming Zone News Hub",
    category: "Content Management",
    description: "Agricultural news magazine platform with article management, category organization, and reader engagement features — keeping Rwanda's farming community informed with the latest market and farming updates.",
    image: "/images/portfolio/agri.jpg",
    icon: Newspaper,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Ifishi Dataflow",
    category: "Employee Reporting Management System",
    description: "Employee reporting and workforce management system with automated report submission, performance tracking, and analytics dashboards — built to streamline internal operations for growing organizations.",
    image: "/images/portfolio/Employee-reporting-ms.jpg",
    icon: ClipboardList,
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    title: "Lamennais Venue Flow",
    category: "Event Management",
    description: "Events venue booking system with calendar integration, real-time availability, and customer communication tools — built for event venues and spaces managing multiple bookings.",
    image: "/images/portfolio/Event Management.jpg",
    icon: CalendarCheck,
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: 6,
    title: "Intama Choir Management",
    category: "Organization Management",
    description: "Choir members management platform with attendance tracking, event scheduling, and performance coordination — built to help music organizations run smoothly.",
    image: "/images/portfolio/choir management system.jpg",
    icon: Music,
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: 7,
    title: "Ikimina Savings & Credit System",
    category: "Savings & Credit Management (Ikimina)",
    description: "Digital savings and credit management system for Ikimina groups, with member contributions tracking, loan management, and automated statements — bringing Rwanda's community savings tradition online.",
    image: "/images/portfolio/ikimina-savings-credit.jpg",
    icon: PiggyBank,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 8,
    title: "Restaurant Inventory Manager",
    category: "Restaurant Inventory Management System",
    description: "Real-time inventory tracking for restaurants, covering stock levels, supplier orders, and waste monitoring — helping kitchens cut costs and avoid running out of key ingredients.",
    image: "/images/portfolio/restaurant-inventory-management.jpg",
    icon: UtensilsCrossed,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 9,
    title: "Pharmacy Management System",
    category: "Full Dashboard, POS & Inventory",
    description: "Complete pharmacy platform with a full admin dashboard, point-of-sale, and inventory control — tracking stock expiry, prescriptions, and daily sales in one place.",
    image: "/images/portfolio/pharmacy-management-system.jpg",
    icon: Pill,
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    id: 10,
    title: "POS & Inventory Management System",
    category: "Retail",
    description: "Point-of-sale and inventory system for retail businesses, with barcode-ready checkout, stock alerts, and sales reporting — built to keep shops running smoothly at the counter and in the stockroom.",
    image: "/images/portfolio/pos-inventory-management.jpg",
    icon: Barcode,
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: 11,
    title: "Clinic Management System",
    category: "Healthcare",
    description: "Patient records, appointment scheduling, and billing in one clinic platform — designed to reduce front-desk workload and keep patient care organized.",
    image: "/images/portfolio/clinic-management-system.jpg",
    icon: HeartPulse,
    color: "from-sky-500/20 to-blue-500/20",
  },
  {
    id: 12,
    title: "School Exam Seating System",
    category: "Education",
    description: "Automated exam seating arrangement system for schools, generating conflict-free seating plans and printable hall layouts in minutes instead of hours.",
    image: "/images/portfolio/school-exam-seating-system.jpg",
    icon: ClipboardCheck,
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: 13,
    title: "Complete Ecommerce Admin Panel",
    category: "Bulk Orders, AI Chat Support, Invoices & Quotes",
    description: "Full-featured e-commerce back office with bulk order processing, AI-powered chat support, and automated invoices and quotes — giving store owners one dashboard to run the whole operation.",
    image: "/images/portfolio/ecommerce-admin-panel.jpg",
    icon: LayoutDashboard,
    color: "from-violet-500/20 to-fuchsia-500/20",
  },
  {
    id: 14,
    title: "HR Attendance & Payroll System",
    category: "Human Resources",
    description: "Staff attendance tracking and payroll processing system with automated salary calculations, leave management, and payslip generation — built to simplify HR for growing teams.",
    image: "/images/portfolio/hr-attendance-payroll-system.jpg",
    icon: CalendarClock,
    color: "from-slate-500/20 to-blue-500/20",
  },
  {
    id: 15,
    title: "Inventory Management System",
    category: "POS & QR Scanner",
    description: "Inventory and point-of-sale system with QR code scanning for fast stock lookups and checkout — cutting manual entry errors and speeding up daily operations.",
    image: "/images/portfolio/inventory-management-qr-scanner.jpg",
    icon: QrCode,
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 16,
    title: "Complete AI Hotel Management System",
    category: "Hospitality & AI",
    description: "Next-generation hotel management platform with AI-assisted booking recommendations, dynamic pricing insights, and automated guest communication — built for hotels ready to modernize.",
    image: "/images/portfolio/ai-hotel-management-system.jpg",
    icon: BrainCircuit,
    color: "from-purple-500/20 to-blue-500/20",
  },
  {
    id: 17,
    title: "Budget Tracker App",
    category: "Personal Finance",
    description: "Personal budgeting app for tracking income, expenses, and savings goals — with visual spending breakdowns that make it easy to stay on top of your money.",
    image: "/images/portfolio/budget-tracker-app.jpg",
    icon: Wallet,
    color: "from-green-500/20 to-lime-500/20",
  },
  {
    id: 18,
    title: "Complete Student Fee Management System",
    category: "Education & Finance",
    description: "End-to-end school fee management with automated invoicing, payment tracking, and parent notifications — reducing manual bookkeeping for school finance teams.",
    image: "/images/portfolio/student-fee-management-system.jpg",
    icon: Receipt,
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: 19,
    title: "Job Application Management Dashboard",
    category: "HR & Recruitment",
    description: "Recruitment dashboard for managing job postings, applicant pipelines, and interview scheduling — helping hiring teams move from application to offer faster.",
    image: "/images/portfolio/job-application-management-dashboard.jpg",
    icon: Briefcase,
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: 20,
    title: "Complete Food Ordering System",
    category: "Food & Delivery",
    description: "Online food ordering platform with live menus, order tracking, and delivery coordination — built for restaurants ready to take orders directly from customers.",
    image: "/images/portfolio/food-ordering-system.jpg",
    icon: ShoppingCart,
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 21,
    title: "Complete E-commerce Logistics System",
    category: "E-commerce & Logistics",
    description: "Order fulfillment and delivery logistics platform for e-commerce businesses, with shipment tracking, courier assignment, and delivery status updates for customers.",
    image: "/images/portfolio/ecommerce-logistics-system.jpg",
    icon: Truck,
    color: "from-blue-500/20 to-cyan-500/20",
  },
];

const INITIAL_VISIBLE = 6;

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

function ProjectThumbnail({ project, className }: { project: Project; className?: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = project.icon;

  if (imageFailed) {
    return (
      <div className={`bg-gradient-to-br ${project.color} flex flex-col items-center justify-center gap-3 ${className ?? ""}`}>
        <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Preview Coming Soon
        </span>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={`${project.title} - ${project.category} project by Bosswebber`}
      title={`${project.title} - ${project.category}`}
      className={`object-cover ${className ?? ""}`}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );
}

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

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
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + (index % INITIAL_VISIBLE) * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-2xl glass-card">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="aspect-[4/3] overflow-hidden">
                  <ProjectThumbnail
                    project={project}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-110"
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

        {projects.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll((prev) => !prev)}
              className="gap-2"
            >
              {showAll ? "Show Fewer Projects" : `View All ${projects.length} Projects`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </Button>
          </div>
        )}
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
              <ProjectThumbnail project={selectedProject} className="w-full h-full" />
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
