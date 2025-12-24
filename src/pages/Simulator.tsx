import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Zap,
  Refrigerator,
  Wind,
  Tv,
  Lightbulb,
  WashingMachine,
  Fan,
  Microwave,
  Monitor,
  Heater,
  Undo2,
  Redo2,
  Save,
  Download,
  Search,
  Plus,
  X,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface Appliance {
  id: string;
  name: string;
  icon: React.ElementType;
  defaultWattage: number;
  minWattage: number;
  maxWattage: number;
}

interface PlacedAppliance extends Appliance {
  instanceId: string;
  x: number;
  y: number;
  wattage: number;
  hoursPerDay: number;
  starRating: number;
}

const appliances: Appliance[] = [
  { id: "fridge", name: "Refrigerator", icon: Refrigerator, defaultWattage: 150, minWattage: 100, maxWattage: 400 },
  { id: "ac", name: "AC", icon: Wind, defaultWattage: 1500, minWattage: 500, maxWattage: 3000 },
  { id: "tv", name: "TV", icon: Tv, defaultWattage: 100, minWattage: 50, maxWattage: 300 },
  { id: "led", name: "LED Bulb", icon: Lightbulb, defaultWattage: 10, minWattage: 5, maxWattage: 20 },
  { id: "washing", name: "Washing Machine", icon: WashingMachine, defaultWattage: 500, minWattage: 300, maxWattage: 1000 },
  { id: "fan", name: "Fan", icon: Fan, defaultWattage: 75, minWattage: 30, maxWattage: 120 },
  { id: "microwave", name: "Microwave", icon: Microwave, defaultWattage: 1000, minWattage: 600, maxWattage: 1500 },
  { id: "computer", name: "Computer", icon: Monitor, defaultWattage: 200, minWattage: 100, maxWattage: 500 },
  { id: "heater", name: "Heater", icon: Heater, defaultWattage: 1500, minWattage: 500, maxWattage: 3000 },
];

const ELECTRICITY_RATE = 8; // ₹ per kWh

const Simulator = () => {
  const [placedAppliances, setPlacedAppliances] = useState<PlacedAppliance[]>([]);
  const [selectedAppliance, setSelectedAppliance] = useState<PlacedAppliance | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roomName, setRoomName] = useState("Living Room");

  const filteredAppliances = appliances.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addAppliance = useCallback((appliance: Appliance) => {
    const newAppliance: PlacedAppliance = {
      ...appliance,
      instanceId: `${appliance.id}-${Date.now()}`,
      x: 150 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      wattage: appliance.defaultWattage,
      hoursPerDay: 4,
      starRating: 3,
    };
    setPlacedAppliances((prev) => [...prev, newAppliance]);
    setSelectedAppliance(newAppliance);
    toast.success(`${appliance.name} added to room`);
  }, []);

  const removeAppliance = useCallback((instanceId: string) => {
    setPlacedAppliances((prev) => prev.filter((a) => a.instanceId !== instanceId));
    setSelectedAppliance(null);
    toast.info("Appliance removed");
  }, []);

  const updateAppliance = useCallback((instanceId: string, updates: Partial<PlacedAppliance>) => {
    setPlacedAppliances((prev) =>
      prev.map((a) => (a.instanceId === instanceId ? { ...a, ...updates } : a))
    );
    if (selectedAppliance?.instanceId === instanceId) {
      setSelectedAppliance((prev) => (prev ? { ...prev, ...updates } : null));
    }
  }, [selectedAppliance]);

  const calculateMonthlyBill = () => {
    const totalKWh = placedAppliances.reduce((sum, appliance) => {
      const dailyKWh = (appliance.wattage * appliance.hoursPerDay) / 1000;
      const monthlyKWh = dailyKWh * 30;
      return sum + monthlyKWh;
    }, 0);
    return (totalKWh * ELECTRICITY_RATE).toFixed(2);
  };

  const calculateTotalLoad = () => {
    return (placedAppliances.reduce((sum, a) => sum + a.wattage, 0) / 1000).toFixed(1);
  };

  const handleSave = () => {
    toast.success("Room configuration saved!");
  };

  const handleDownloadReport = () => {
    toast.success("Downloading PDF report...");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-lg px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Zap className="h-6 w-6 text-accent fill-accent" />
            <span className="text-lg font-bold text-foreground">
              Power<span className="text-primary">Fusion</span>
            </span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="bg-transparent text-foreground font-medium focus:outline-none focus:border-b focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm" onClick={() => toast.info("Undo")}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="sm" onClick={() => toast.info("Redo")}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button variant="electric" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar - Appliance Library */}
        <aside className="w-72 border-r border-border bg-card/30 p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-foreground mb-4">Appliance Library</h2>
          
          {/* Appliance Icons Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {appliances.slice(0, 9).map((appliance) => (
              <button
                key={appliance.id}
                onClick={() => addAppliance(appliance)}
                className="aspect-square rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary flex flex-col items-center justify-center gap-1 transition-all duration-200 appliance-item p-2"
              >
                <appliance.icon className="h-6 w-6 text-primary" />
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{appliance.name}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-2">
              {filteredAppliances.map((appliance) => (
                <button
                  key={appliance.id}
                  onClick={() => addAppliance(appliance)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary transition-colors"
                >
                  <appliance.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">{appliance.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Add Custom */}
          <Button variant="glass" className="mt-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Appliance
          </Button>
        </aside>

        {/* Center - Workspace Grid */}
        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 simulator-grid" />
          
          {/* Placed Appliances */}
          <div className="relative w-full h-full p-8">
            {/* Main Meter */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Main Meter</div>
                <div className="text-lg font-bold text-foreground">{calculateTotalLoad()} kW</div>
              </div>
            </div>

            {/* Placed Items */}
            {placedAppliances.map((appliance) => (
              <div
                key={appliance.instanceId}
                onClick={() => setSelectedAppliance(appliance)}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  selectedAppliance?.instanceId === appliance.instanceId
                    ? "scale-110 z-10"
                    : "hover:scale-105"
                }`}
                style={{ left: appliance.x, top: appliance.y }}
              >
                <div
                  className={`glass-card p-4 ${
                    selectedAppliance?.instanceId === appliance.instanceId
                      ? "border-primary glow-primary"
                      : ""
                  }`}
                >
                  <appliance.icon className="h-8 w-8 text-primary" />
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {appliance.wattage}W
                  </div>
                </div>
                {/* Connection Line */}
                <div className="absolute top-0 left-1/2 w-px h-8 -translate-y-full bg-gradient-to-t from-primary/50 to-transparent" />
              </div>
            ))}

            {/* Empty State */}
            {placedAppliances.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Lightbulb className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Drag appliances from the library</p>
                  <p className="text-sm">or click on them to add to your room</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar - Settings Panel */}
        <aside className="w-80 border-l border-border bg-card/30 p-4 flex flex-col">
          {selectedAppliance ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                  {selectedAppliance.name} Settings
                </h2>
                <button
                  onClick={() => removeAppliance(selectedAppliance.instanceId)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Wattage Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Wattage (W)</label>
                    <span className="text-sm text-primary">{selectedAppliance.wattage}W</span>
                  </div>
                  <Slider
                    value={[selectedAppliance.wattage]}
                    onValueChange={([value]) =>
                      updateAppliance(selectedAppliance.instanceId, { wattage: value })
                    }
                    min={selectedAppliance.minWattage}
                    max={selectedAppliance.maxWattage}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{selectedAppliance.minWattage}W</span>
                    <span>{selectedAppliance.maxWattage}W</span>
                  </div>
                </div>

                {/* Hours per Day */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Daily Usage (Hours)</label>
                  <Input
                    type="number"
                    min={1}
                    max={24}
                    value={selectedAppliance.hoursPerDay}
                    onChange={(e) =>
                      updateAppliance(selectedAppliance.instanceId, {
                        hoursPerDay: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          updateAppliance(selectedAppliance.instanceId, { starRating: star })
                        }
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            star <= selectedAppliance.starRating
                              ? "text-accent fill-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Cost */}
                <div className="glass-card p-4">
                  <div className="text-sm text-muted-foreground mb-1">Estimated Cost (Monthly)</div>
                  <div className="text-2xl font-bold text-accent">
                    ₹{((selectedAppliance.wattage * selectedAppliance.hoursPerDay * 30 * ELECTRICITY_RATE) / 1000).toFixed(2)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="text-muted-foreground">
                <Monitor className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>Select an appliance to view settings</p>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Bottom Dashboard */}
      <footer className="h-20 border-t border-border bg-card/50 backdrop-blur-lg px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <div className="text-sm text-muted-foreground">Total Load</div>
            <div className="text-xl font-bold text-foreground">{calculateTotalLoad()} kW</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-sm text-muted-foreground">Projected Monthly Bill</div>
            <div className="text-2xl font-bold gradient-text-accent">₹{calculateMonthlyBill()}</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-sm text-muted-foreground">Energy Rating</div>
            <div className="text-xl font-bold text-primary">A+</div>
          </div>
        </div>
        <Button variant="neon" size="lg" onClick={handleDownloadReport}>
          <Download className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
      </footer>
    </div>
  );
};

export default Simulator;
