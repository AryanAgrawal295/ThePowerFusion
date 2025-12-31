import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingDown, Leaf, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import heroImage from "@/assets/hero-illustration.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Calculate, Simulate, and{" "}
                <span className="gradient-text-accent">Save</span> on Your Electricity
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Apne ghar ya apartment ka bill predict karein hamare advanced simulator ke saath. Manage your electricity like a pro.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/simulator">
                    Start Calculating Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="glass" size="xl" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">1M+</div>
                    <div className="text-sm text-muted-foreground">Homes Optimized</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">30%</div>
                    <div className="text-sm text-muted-foreground">Avg. Bill Reduction</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">Eco</div>
                    <div className="text-sm text-muted-foreground">Friendly Insights</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative animate-float hidden lg:block">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Power Fusion Smart Home Simulator"
                  className="w-full max-w-lg mx-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing */}
      <Pricing />

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join 100k+ Users Saving Energy
              </h2>
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Save money</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Eco-friendly Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>Easy to use</span>
                </div>
              </div>
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          © 2024 Power Fusion. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
