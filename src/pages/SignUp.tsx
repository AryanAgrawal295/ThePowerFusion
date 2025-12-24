import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, User, Mail, Lock, Eye, EyeOff, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

const plans = [
  { value: "single-room", label: "Single Room" },
  { value: "full-house", label: "Full House" },
  { value: "apartment", label: "Apartment" },
];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !selectedPlan) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    toast.success("Account created successfully! Redirecting...");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="relative">
            <Zap className="h-10 w-10 text-accent fill-accent group-hover:animate-pulse" />
            <div className="absolute inset-0 blur-lg bg-accent/30" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Power<span className="text-primary">Fusion</span>
          </span>
        </Link>

        {/* Sign Up Card */}
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">
            Get Started
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Create your account to start saving
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="John Doe"
                  className="pl-12"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name@email.com"
                  className="pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Plan Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Plan</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                  className="flex items-center justify-between w-full h-12 px-4 rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                >
                  <span className={selectedPlan ? "text-foreground" : "text-muted-foreground"}>
                    {selectedPlan ? plans.find(p => p.value === selectedPlan)?.label : "Choose your plan"}
                  </span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${showPlanDropdown ? "rotate-180" : ""}`} />
                </button>
                {showPlanDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                    {plans.map((plan) => (
                      <button
                        key={plan.value}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(plan.value);
                          setShowPlanDropdown(false);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-secondary transition-colors"
                      >
                        <span className="text-foreground">{plan.label}</span>
                        {selectedPlan === plan.value && (
                          <Check className="h-4 w-4 text-accent" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="pl-12 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  agreeTerms ? "bg-accent border-accent" : "border-border bg-secondary/50"
                }`}
              >
                {agreeTerms && <Check className="h-3 w-3 text-accent-foreground" />}
              </button>
              <label className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="#" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <Button type="submit" variant="neon" size="lg" className="w-full">
              Create My Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-muted-foreground mt-6">
            Already have account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
