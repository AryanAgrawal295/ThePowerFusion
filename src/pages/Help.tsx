import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Building,
  BarChart3,
  HelpCircle,
  LogOut,
  Zap,
  User,
  Mail,
  MessageSquare,
  Book,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I create a new property?",
    answer: "Go to Properties page, click 'New Property' button, choose between House or Apartment, then add rooms and devices to your property.",
  },
  {
    question: "How does the electricity bill calculation work?",
    answer: "The simulator calculates your estimated bill based on device power ratings, usage hours, and your local electricity tariff. Add devices to a room and turn them ON to see real-time cost estimates.",
  },
  {
    question: "Can I add custom devices?",
    answer: "Currently, you can choose from a preset list of common household devices. Custom device support is coming soon!",
  },
  {
    question: "How accurate is the bill estimation?",
    answer: "The estimation is based on standard power consumption values. Actual bills may vary based on your specific appliance models and usage patterns.",
  },
  {
    question: "How do I analyze my energy consumption?",
    answer: "Navigate to the Analysis page from the sidebar. You can view trends at property, room, and device levels with day-wise, monthly, or 40-day device trends.",
  },
  {
    question: "Can I share my property configurations?",
    answer: "Property sharing feature is currently in development. Stay tuned for updates!",
  },
];

const Help = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("help");

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building, path: "/properties" },
    { id: "analysis", label: "Analysis", icon: BarChart3, path: "/analysis" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Power Fusion</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-border flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">John Doe</h3>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeMenu === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-foreground">Help & Support</h1>
        </header>

        {/* Help Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Quick Help Cards */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">User Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to use Power Fusion effectively
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Watch step-by-step tutorials
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help from our support team
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="bg-card rounded-xl border border-border">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="px-6 text-left hover:no-underline hover:bg-muted/50">
                      <span className="text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Still Need Help?</h2>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@powerfusion.com</p>
                </div>
                <Button variant="outline">
                  Send Email
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
