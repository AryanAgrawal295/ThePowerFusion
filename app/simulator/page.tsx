"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Power,
  ArrowLeft,
  Droplets,
  CookingPot,
  Lamp,
} from "lucide-react";
import { toast } from "sonner";
import { DevicePopup } from "@/components/DevicePopup";
import { SpecificationsPanel } from "@/components/SpecificationsPanel";

interface Device {
  id: string;
  name: string;
  icon: React.ElementType;
  defaultWattage: number;
  minWattage: number;
  maxWattage: number;
  category: string;
}

interface PlacedDevice extends Device {
  instanceId: string;
  x: number;
  y: number;
  wattage: number;
  hoursPerDay: number;
  isOn: boolean;
  deviceNumber: string;
}

const devices: Device[] = [
  { id: "fridge", name: "Refrigerator", icon: Refrigerator, defaultWattage: 150, minWattage: 100, maxWattage: 400, category: "kitchen" },
  { id: "ac", name: "AC", icon: Wind, defaultWattage: 1500, minWattage: 500, maxWattage: 3000, category: "basic" },
  { id: "tv", name: "TV", icon: Tv, defaultWattage: 100, minWattage: 50, maxWattage: 300, category: "basic" },
  { id: "led", name: "LED Bulb", icon: Lightbulb, defaultWattage: 10, minWattage: 5, maxWattage: 20, category: "basic" },
  { id: "washing", name: "Washing Machine", icon: WashingMachine, defaultWattage: 500, minWattage: 300, maxWattage: 1000, category: "washroom" },
  { id: "fan", name: "Fan", icon: Fan, defaultWattage: 75, minWattage: 30, maxWattage: 120, category: "basic" },
  { id: "microwave", name: "Microwave", icon: Microwave, defaultWattage: 1000, minWattage: 600, maxWattage: 1500, category: "kitchen" },
  { id: "computer", name: "Computer", icon: Monitor, defaultWattage: 200, minWattage: 100, maxWattage: 500, category: "basic" },
  { id: "heater", name: "Heater", icon: Heater, defaultWattage: 1500, minWattage: 500, maxWattage: 3000, category: "washroom" },
  { id: "geyser", name: "Geyser", icon: Droplets, defaultWattage: 2000, minWattage: 1000, maxWattage: 3000, category: "washroom" },
  { id: "induction", name: "Induction", icon: CookingPot, defaultWattage: 1800, minWattage: 1000, maxWattage: 2500, category: "kitchen" },
  { id: "lamp", name: "Table Lamp", icon: Lamp, defaultWattage: 40, minWattage: 20, maxWattage: 100, category: "basic" },
];

const categories = [
  { id: "all", label: "All Devices" },
  { id: "basic", label: "Basic Devices" },
  { id: "kitchen", label: "Kitchen Devices" },
  { id: "washroom", label: "Washroom Devices" },
  { id: "other", label: "Other" },
];

const ELECTRICITY_RATE = 8; // ₹ per kWh

export default function Simulator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roomName = searchParams.get("roomName") || "Living Room";
  
  const [placedDevices, setPlacedDevices] = useState<PlacedDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<PlacedDevice | null>(null);
  const [devicePopupOpen, setDevicePopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mcbOn, setMcbOn] = useState(true);

  const filteredDevices = devices.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addDevice = useCallback((device: Device) => {
    const newDevice: PlacedDevice = {
      ...device,
      instanceId: `${device.id}-${Date.now()}`,
      x: 100 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      wattage: device.defaultWattage,
      hoursPerDay: 4,
      isOn: false,
      deviceNumber: `${device.id.toUpperCase()}-${String(placedDevices.filter(d => d.id === device.id).length + 1).padStart(2, '0')}`,
    };
    setPlacedDevices((prev) => [...prev, newDevice]);
    toast.success(`${device.name} added to room`);
  }, [placedDevices]);

  const removeDevice = useCallback((instanceId: string) => {
    setPlacedDevices((prev) => prev.filter((d) => d.instanceId !== instanceId));
    setSelectedDevice(null);
    toast.info("Device removed");
  }, []);

  const updateDevice = useCallback((updatedDevice: PlacedDevice) => {
    setPlacedDevices((prev) =>
      prev.map((d) => (d.instanceId === updatedDevice.instanceId ? updatedDevice : d))
    );
    setSelectedDevice(updatedDevice);
  }, []);

  const toggleDevicePower = useCallback((instanceId: string) => {
    if (!mcbOn) {
      toast.error("Turn ON main MCB first");
      return;
    }
    setPlacedDevices((prev) =>
      prev.map((d) =>
        d.instanceId === instanceId ? { ...d, isOn: !d.isOn } : d
      )
    );
  }, [mcbOn]);

  const handleMcbToggle = (checked: boolean) => {
    setMcbOn(checked);
    if (!checked) {
      // Turn off all devices when MCB is off
      setPlacedDevices((prev) =>
        prev.map((d) => ({ ...d, isOn: false }))
      );
      toast.info("Main power OFF - All devices turned off");
    } else {
      toast.success("Main power ON");
    }
  };

  const handleDeviceClick = (device: PlacedDevice) => {
    setSelectedDevice(device);
    setDevicePopupOpen(true);
  };

  const calculateMonthlyBill = () => {
    const totalKWh = placedDevices.reduce((sum, device) => {
      if (!device.isOn) return sum;
      const dailyKWh = (device.wattage * device.hoursPerDay) / 1000;
      const monthlyKWh = dailyKWh * 30;
      return sum + monthlyKWh;
    }, 0);
    return (totalKWh * ELECTRICITY_RATE).toFixed(2);
  };

  const calculateTotalLoad = () => {
    const activeLoad = placedDevices
      .filter((d) => d.isOn)
      .reduce((sum, d) => sum + d.wattage, 0);
    return (activeLoad / 1000).toFixed(2);
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
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-accent fill-accent" />
            <span className="text-lg font-bold text-foreground">
              Power<span className="text-primary">Fusion</span>
            </span>
          </div>
          <div className="h-6 w-px bg-border" />
          <span className="text-foreground font-medium">{roomName}</span>
        </div>
        <div className="flex items-center gap-3">
          <SpecificationsPanel devices={placedDevices} electricityRate={ELECTRICITY_RATE} />
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
        {/* Left Section - Room Layout (2/3 width) */}
        <main className="flex-1 w-2/3 relative overflow-hidden bg-secondary/10">
          <div className="absolute inset-0 simulator-grid" />
          
          {/* Placed Devices */}
          <div className="relative w-full h-full p-8">
            {/* Placed Items */}
            {placedDevices.map((device) => {
              const Icon = device.icon;
              const isActive = device.isOn && mcbOn;
              return (
                <div
                  key={device.instanceId}
                  className="absolute cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ left: device.x, top: device.y }}
                  onClick={() => handleDeviceClick(device)}
                >
                  <div className={`glass-card p-4 relative ${isActive ? "border-accent glow-accent" : "border-border"}`}>
                    <Icon className={`h-10 w-10 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                    
                    {/* Mini ON/OFF Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDevicePower(device.instanceId);
                      }}
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isActive 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Power className="h-3 w-3" />
                    </button>
                    
                    {/* Status Label */}
                    <div className="text-xs text-center mt-2">
                      <span className={`font-medium ${isActive ? "text-accent" : "text-muted-foreground"}`}>
                        {isActive ? "ON" : "OFF"}
                      </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground text-center">
                      {device.wattage}W
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {placedDevices.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Lightbulb className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Drag devices from the panel</p>
                  <p className="text-sm">or click on them to add to your room</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Section - Device Control Panel (1/3 width) */}
        <aside className="w-1/3 max-w-md border-l border-border bg-card/30 flex flex-col">
          {/* MCB Switch */}
          <div className={`p-4 border-b border-border ${mcbOn ? "bg-accent/10" : "bg-destructive/10"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  mcbOn ? "bg-accent/20" : "bg-destructive/20"
                }`}>
                  <Zap className={`h-6 w-6 ${mcbOn ? "text-accent" : "text-destructive"}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Main MCB</h3>
                  <p className="text-xs text-muted-foreground">Master power control</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${mcbOn ? "text-accent" : "text-destructive"}`}>
                  {mcbOn ? "ON" : "OFF"}
                </span>
                <Switch
                  checked={mcbOn}
                  onCheckedChange={handleMcbToggle}
                  className="data-[state=checked]:bg-accent"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="p-4 border-b border-border">
            <ScrollArea className="w-full">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                className="pl-9 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Device List */}
          <ScrollArea className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-3">
              {filteredDevices.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => addDevice(device)}
                    className="aspect-square rounded-xl bg-secondary/30 border border-border hover:border-primary/50 hover:bg-secondary/50 flex flex-col items-center justify-center gap-2 transition-all duration-200 p-3"
                  >
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-xs text-muted-foreground text-center leading-tight">
                      {device.name}
                    </span>
                    <span className="text-[10px] text-primary/70">
                      {device.defaultWattage}W
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredDevices.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No devices found</p>
              </div>
            )}

            {/* Add Custom */}
            <Button variant="glass" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Custom Device
            </Button>
          </ScrollArea>

          {/* Bottom Stats */}
          <div className="p-4 border-t border-border bg-card/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs text-muted-foreground">Active Load</p>
                <p className="text-xl font-bold text-foreground">{calculateTotalLoad()} kW</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <p className="text-xs text-muted-foreground">Monthly Est.</p>
                <p className="text-xl font-bold text-accent">₹{calculateMonthlyBill()}</p>
              </div>
            </div>
            <Button variant="neon" className="w-full mt-4" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </aside>
      </div>

      {/* Device Popup */}
      <DevicePopup
        device={selectedDevice}
        isOpen={devicePopupOpen}
        onClose={() => setDevicePopupOpen(false)}
        onSave={updateDevice}
        onDelete={removeDevice}
        mcbOn={mcbOn}
      />
    </div>
  );
}
