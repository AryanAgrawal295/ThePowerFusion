import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileText, Power } from "lucide-react";

interface Device {
  instanceId: string;
  name: string;
  icon: React.ElementType;
  wattage: number;
  hoursPerDay: number;
  isOn: boolean;
  deviceNumber: string;
  category: string;
}

interface SpecificationsPanelProps {
  devices: Device[];
  electricityRate: number;
}

export const SpecificationsPanel = ({
  devices,
  electricityRate,
}: SpecificationsPanelProps) => {
  const calculateMonthlyCost = (device: Device) => {
    if (!device.isOn) return 0;
    return ((device.wattage * device.hoursPerDay * 30 * electricityRate) / 1000);
  };

  const totalMonthlyCost = devices.reduce((sum, d) => sum + calculateMonthlyCost(d), 0);
  const totalLoad = devices.filter(d => d.isOn).reduce((sum, d) => sum + d.wattage, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Specifications
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-card border-border w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Room Specifications
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground">Total Devices</p>
              <p className="text-2xl font-bold text-foreground">{devices.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground">Active Devices</p>
              <p className="text-2xl font-bold text-accent">{devices.filter(d => d.isOn).length}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground">Total Load</p>
              <p className="text-2xl font-bold text-foreground">{(totalLoad / 1000).toFixed(2)} kW</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10">
              <p className="text-xs text-muted-foreground">Est. Monthly</p>
              <p className="text-2xl font-bold text-accent">₹{totalMonthlyCost.toFixed(0)}</p>
            </div>
          </div>

          {/* Device List */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Device Details</h3>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3 pr-4">
                {devices.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No devices in room
                  </p>
                ) : (
                  devices.map((device) => {
                    const Icon = device.icon;
                    return (
                      <div
                        key={device.instanceId}
                        className="p-3 rounded-lg bg-secondary/20 border border-border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${device.isOn ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="font-medium text-foreground text-sm">{device.name}</span>
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                            device.isOn 
                              ? "bg-accent/20 text-accent" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <Power className="h-3 w-3" />
                            {device.isOn ? "ON" : "OFF"}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>
                            <span className="text-muted-foreground/70">ID:</span>{" "}
                            <span>{device.deviceNumber || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground/70">Category:</span>{" "}
                            <span className="capitalize">{device.category}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground/70">Power:</span>{" "}
                            <span>{device.wattage}W</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground/70">Usage:</span>{" "}
                            <span>{device.hoursPerDay}h/day</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground/70">Monthly Cost:</span>{" "}
                            <span className="text-accent font-medium">
                              ₹{calculateMonthlyCost(device).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
