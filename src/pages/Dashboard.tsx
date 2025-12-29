import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Building,
  BarChart3,
  HelpCircle,
  LogOut,
  Plus,
  Zap,
  DoorOpen,
  Building2,
  House,
  User,
  Clock,
  Layers,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building, path: "/properties" },
    { id: "analysis", label: "Analysis", icon: BarChart3, path: "/analysis" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ];

  const recentProjects = {
    lastProperty: { name: "2BHK Apartment - Block A", type: "Apartment", date: "2 hours ago" },
    lastRoom: { name: "Master Bedroom", type: "Room", date: "Yesterday" },
  };

  const quickStats = {
    totalProperties: 5,
    totalRooms: 12,
  };

  const handleCreate = (type: string) => {
    navigate(`/simulator?type=${type}`);
  };

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
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* Create Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6">
                  <Plus className="w-5 h-5" />
                  Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <DropdownMenuItem
                  onClick={() => navigate("/properties")}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-muted"
                >
                  <Building className="w-5 h-5 text-primary" />
                  <span className="font-medium">Properties</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Quick Stats */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Quick Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Properties</p>
                  <p className="text-3xl font-bold text-foreground">{quickStats.totalProperties}</p>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                  <p className="text-3xl font-bold text-foreground">{quickStats.totalRooms}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Projects */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recently Accessed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Last Opened Property */}
              <div className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Opened Property</p>
                    <h3 className="font-semibold text-foreground">{recentProjects.lastProperty.name}</h3>
                    <p className="text-sm text-muted-foreground">{recentProjects.lastProperty.date}</p>
                  </div>
                </div>
              </div>

              {/* Last Opened Room */}
              <div className="bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-all">
                    <DoorOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Last Opened Room</p>
                    <h3 className="font-semibold text-foreground">{recentProjects.lastRoom.name}</h3>
                    <p className="text-sm text-muted-foreground">{recentProjects.lastRoom.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Create New Property */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Create New Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* House Card */}
              <div
                onClick={() => handleCreate("house")}
                className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="h-36 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <House className="w-16 h-16 text-primary opacity-60 group-hover:opacity-100 transition-all" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg">House</h3>
                  <p className="text-sm text-muted-foreground">Create a complete house layout with multiple rooms</p>
                </div>
              </div>

              {/* Flat/Apartment Card */}
              <div
                onClick={() => handleCreate("apartment")}
                className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all group"
              >
                <div className="h-36 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-accent opacity-60 group-hover:opacity-100 transition-all" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground text-lg">Flat / Apartment</h3>
                  <p className="text-sm text-muted-foreground">Design your apartment with all rooms and appliances</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
