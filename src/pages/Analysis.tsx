import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  Building,
  BarChart3,
  HelpCircle,
  LogOut,
  Zap,
  User,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import { TrendGraph } from "@/components/analysis/TrendGraph";
import { DeviceDistribution } from "@/components/analysis/DeviceDistribution";
import { BillEstimation } from "@/components/analysis/BillEstimation";

interface Room {
  id: string;
  name: string;
}

interface Property {
  id: string;
  name: string;
  rooms: Room[];
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "2BHK Apartment - Block A",
    rooms: [
      { id: "1-1", name: "Master Bedroom" },
      { id: "1-2", name: "Living Room" },
      { id: "1-3", name: "Kitchen" },
    ],
  },
  {
    id: "2",
    name: "My Villa",
    rooms: [
      { id: "2-1", name: "Hall" },
      { id: "2-2", name: "Bedroom 1" },
      { id: "2-3", name: "Bedroom 2" },
      { id: "2-4", name: "Kitchen" },
    ],
  },
  {
    id: "3",
    name: "Studio Apartment",
    rooms: [{ id: "3-1", name: "Main Room" }],
  },
];

const Analysis = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("analysis");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("all");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("all");
  const [trendMode, setTrendMode] = useState<"day" | "device" | "month">("day");

  const menuItems = [
    { id: "home", label: "Home", icon: Home, path: "/dashboard" },
    { id: "properties", label: "Properties", icon: Building, path: "/properties" },
    { id: "analysis", label: "Analysis", icon: BarChart3, path: "/analysis" },
    { id: "help", label: "Help", icon: HelpCircle, path: "/help" },
  ];

  const selectedProperty = mockProperties.find((p) => p.id === selectedPropertyId);
  const selectedRoom = selectedProperty?.rooms.find((r) => r.id === selectedRoomId);

  // Reset room when property changes
  useEffect(() => {
    setSelectedRoomId("all");
  }, [selectedPropertyId]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenuClick = (item: (typeof menuItems)[0]) => {
    setActiveMenu(item.id);
    navigate(item.path);
  };

  // Calculate totals for global view
  const globalStats = {
    totalPower: 2450, // kWh
    totalSpending: 19600, // ₹
    propertyCount: mockProperties.length,
    roomCount: mockProperties.reduce((sum, p) => sum + p.rooms.length, 0),
  };

  const propertyStats = {
    totalPower: 850,
    totalSpending: 6800,
  };

  const getViewLevel = () => {
    if (selectedRoomId !== "all" && selectedRoom) return "room";
    if (selectedPropertyId !== "all" && selectedProperty) return "property";
    return "global";
  };

  const viewLevel = getViewLevel();

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
              onClick={() => handleMenuClick(item)}
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
          <h1 className="text-xl font-semibold text-foreground">Analysis</h1>

          {/* Property & Room Selectors */}
          <div className="flex items-center gap-4">
            {/* Property Selector */}
            <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Properties</SelectItem>
                {mockProperties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Room Selector - Only shown when property is selected */}
            {selectedPropertyId !== "all" && selectedProperty && (
              <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Rooms</SelectItem>
                  {selectedProperty.rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </header>

        {/* Analysis Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Global View (All Properties) */}
          {viewLevel === "global" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Power Usage</p>
                      <p className="text-2xl font-bold text-foreground">{globalStats.totalPower} kWh</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Estimated Spending</p>
                      <p className="text-2xl font-bold text-accent">₹{globalStats.totalSpending}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <Building className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Properties</p>
                      <p className="text-2xl font-bold text-foreground">{globalStats.propertyCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Rooms</p>
                      <p className="text-2xl font-bold text-foreground">{globalStats.roomCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a Property for Detailed Analysis</h3>
                <p className="text-muted-foreground">
                  Choose a property from the dropdown above to view detailed power usage trends and analytics.
                </p>
              </div>
            </div>
          )}

          {/* Property View (Single Property, All Rooms) */}
          {viewLevel === "property" && selectedProperty && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Property Power Usage</p>
                      <p className="text-2xl font-bold text-foreground">{propertyStats.totalPower} kWh</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Bill</p>
                      <p className="text-2xl font-bold text-accent">₹{propertyStats.totalSpending}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <Building className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{selectedProperty.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedProperty.rooms.length} rooms available. Select a room for detailed analysis.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedProperty.rooms.map((room) => (
                    <Button
                      key={room.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRoomId(room.id)}
                    >
                      {room.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Room View (Full Analysis) */}
          {viewLevel === "room" && selectedRoom && (
            <div className="grid grid-cols-3 gap-6 h-full">
              {/* Left Section (2/3 width) */}
              <div className="col-span-2 flex flex-col gap-6">
                {/* Top - Trend Graph */}
                <div className="flex-1 min-h-[400px]">
                  <TrendGraph trendMode={trendMode} onTrendModeChange={setTrendMode} />
                </div>

                {/* Bottom - Bill Estimation */}
                <div>
                  <BillEstimation trendMode={trendMode} roomName={selectedRoom.name} />
                </div>
              </div>

              {/* Right Section (1/3 width) - Device Distribution */}
              <div className="col-span-1">
                <DeviceDistribution trendMode={trendMode} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analysis;
