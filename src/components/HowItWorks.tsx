import { Building, DoorOpen, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Building,
    title: "Create Property",
    description: "Start by creating a House or Apartment property",
  },
  {
    step: 2,
    icon: DoorOpen,
    title: "Add Rooms",
    description: "Add rooms like Bedroom, Kitchen, Living Room",
  },
  {
    step: 3,
    icon: Zap,
    title: "Drag & Drop Devices",
    description: "Place devices in rooms and configure their usage",
  },
  {
    step: 4,
    icon: BarChart3,
    title: "Get Analysis",
    description: "View estimated bills and consumption insights",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-card border-2 border-primary mb-6">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <item.icon className="w-10 h-10 text-primary" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
