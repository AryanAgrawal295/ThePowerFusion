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
  LayoutGrid,
  FolderOpen,
  BookOpen,
  Trophy,
  HelpCircle,
  Plus,
  Zap,
  DoorOpen,
  Building2,
  House,
  User,
  Search,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "designs", label: "My Designs", icon: LayoutGrid },
    { id: "collections", label: "Collections", icon: FolderOpen },
    { id: "tutorials", label: "Tutorials", icon: BookOpen },
    { id: "challenges", label: "Challenges", icon: Trophy },
    { id: "help", label: "Help Center", icon: HelpCircle },
  ];

  const recentDesigns = [
    { id: 1, name: "Living Room Setup", type: "Room", date: "2 days ago" },
    { id: 2, name: "2BHK Apartment", type: "Apartment", date: "1 week ago" },
    { id: 3, name: "Villa Layout", type: "House", date: "2 weeks ago" },
  ];

  const handleCreate = (type: string) => {
    navigate(`/simulator?type=${type}`);
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
              onClick={() => setActiveMenu(item.id)}
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search designs..."
                className="pl-10 pr-4 py-2 bg-muted rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

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
                  onClick={() => handleCreate("room")}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-muted"
                >
                  <DoorOpen className="w-5 h-5 text-primary" />
                  <span className="font-medium">Design a Room</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleCreate("apartment")}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-muted"
                >
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">Design an Apartment</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleCreate("house")}
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-muted"
                >
                  <House className="w-5 h-5 text-primary" />
                  <span className="font-medium">Design a House</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 mb-8 border border-primary/30">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John! ⚡
            </h1>
            <p className="text-muted-foreground text-lg">
              Start designing your space and calculate your electricity costs.
            </p>
          </div>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Quick Start
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Create New Card */}
              <button
                onClick={() => handleCreate("room")}
                className="group border-2 border-dashed border-primary/50 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <span className="text-primary font-medium">Create your first design</span>
              </button>

              {/* Room Card */}
              <div
                onClick={() => handleCreate("room")}
                className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <DoorOpen className="w-12 h-12 text-primary opacity-50 group-hover:opacity-100 transition-all" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">Single Room</h3>
                  <p className="text-sm text-muted-foreground">Quick room setup</p>
                </div>
              </div>

              {/* Apartment Card */}
              <div
                onClick={() => handleCreate("apartment")}
                className="cursor-pointer bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-accent opacity-50 group-hover:opacity-100 transition-all" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">Apartment</h3>
                  <p className="text-sm text-muted-foreground">Multi-room layout</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Designs */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Recent Designs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentDesigns.map((design) => (
                <div
                  key={design.id}
                  className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="h-24 bg-muted rounded-lg mb-3 flex items-center justify-center">
                    {design.type === "Room" && <DoorOpen className="w-8 h-8 text-muted-foreground" />}
                    {design.type === "Apartment" && <Building2 className="w-8 h-8 text-muted-foreground" />}
                    {design.type === "House" && <House className="w-8 h-8 text-muted-foreground" />}
                  </div>
                  <h3 className="font-medium text-foreground truncate">{design.name}</h3>
                  <p className="text-sm text-muted-foreground">{design.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
