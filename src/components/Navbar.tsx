import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="h-8 w-8 text-accent fill-accent group-hover:animate-pulse" />
            <div className="absolute inset-0 blur-lg bg-accent/30 group-hover:bg-accent/50 transition-all duration-300" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Power<span className="text-primary">Fusion</span>
          </span>
        </Link>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            How it Works
          </Link>
          <Link to="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            Pricing
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button variant="neon" size="sm" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
