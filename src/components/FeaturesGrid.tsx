import { Zap, BarChart3, Calculator, Lightbulb, Cpu, TrendingDown } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Bill Calculator",
    description: "Calculate your monthly electricity bill with precision",
  },
  {
    icon: Cpu,
    title: "Drag & Drop Simulator",
    description: "Simulate your home appliances like a circuit board",
  },
  {
    icon: BarChart3,
    title: "Real-time Estimates",
    description: "See live cost updates as you add appliances",
  },
  {
    icon: TrendingDown,
    title: "Cost Optimization",
    description: "Get suggestions to reduce your electricity bill",
  },
  {
    icon: Lightbulb,
    title: "Energy Insights",
    description: "Understand which appliances consume the most",
  },
  {
    icon: Zap,
    title: "Save Energy",
    description: "Track and reduce your carbon footprint",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage and optimize your electricity consumption
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
