import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Power } from "lucide-react";

interface Device {
  instanceId: string;
  id: string;
  name: string;
  icon: React.ElementType;
  defaultWattage: number;
  minWattage: number;
  maxWattage: number;
  x: number;
  y: number;
  wattage: number;
  hoursPerDay: number;
  isOn: boolean;
  deviceNumber: string;
  category: string;
}

interface DevicePopupProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  onDelete: (instanceId: string) => void;
  mcbOn: boolean;
}

const categories = [
  { value: "basic", label: "Basic Devices" },
  { value: "kitchen", label: "Kitchen Devices" },
  { value: "washroom", label: "Washroom Devices" },
  { value: "other", label: "Other" },
];

export const DevicePopup = ({
  device,
  isOpen,
  onClose,
  onSave,
  onDelete,
  mcbOn,
}: DevicePopupProps) => {
  const [editedDevice, setEditedDevice] = useState<Device | null>(null);

  useEffect(() => {
    if (device) {
      setEditedDevice({ ...device });
    }
  }, [device]);

  if (!editedDevice) return null;

  const handleSave = () => {
    onSave(editedDevice);
    onClose();
  };

  const handleToggle = () => {
    if (!mcbOn) return;
    setEditedDevice({ ...editedDevice, isOn: !editedDevice.isOn });
  };

  const Icon = editedDevice.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              editedDevice.isOn && mcbOn ? "bg-accent/20" : "bg-muted"
            }`}>
              <Icon className={`w-5 h-5 ${
                editedDevice.isOn && mcbOn ? "text-accent" : "text-muted-foreground"
              }`} />
            </div>
            Device Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Power Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3">
              <Power className={`w-5 h-5 ${
                editedDevice.isOn && mcbOn ? "text-accent" : "text-muted-foreground"
              }`} />
              <span className="font-medium text-foreground">Power</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${
                editedDevice.isOn && mcbOn ? "text-accent" : "text-muted-foreground"
              }`}>
                {editedDevice.isOn && mcbOn ? "ON" : "OFF"}
              </span>
              <Switch
                checked={editedDevice.isOn && mcbOn}
                onCheckedChange={handleToggle}
                disabled={!mcbOn}
              />
            </div>
          </div>

          {!mcbOn && (
            <p className="text-xs text-destructive text-center">
              Main MCB is OFF. Turn it ON to control devices.
            </p>
          )}

          {/* Device Name */}
          <div className="space-y-2">
            <Label htmlFor="deviceName">Device Name</Label>
            <Input
              id="deviceName"
              value={editedDevice.name}
              onChange={(e) => setEditedDevice({ ...editedDevice, name: e.target.value })}
            />
          </div>

          {/* Device Number */}
          <div className="space-y-2">
            <Label htmlFor="deviceNumber">Device Number</Label>
            <Input
              id="deviceNumber"
              value={editedDevice.deviceNumber}
              onChange={(e) => setEditedDevice({ ...editedDevice, deviceNumber: e.target.value })}
              placeholder="e.g., AC-01"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={editedDevice.category}
              onValueChange={(value) => setEditedDevice({ ...editedDevice, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Power Rating */}
          <div className="space-y-2">
            <Label htmlFor="wattage">Power Rating (Watts)</Label>
            <Input
              id="wattage"
              type="number"
              value={editedDevice.wattage}
              onChange={(e) => setEditedDevice({ ...editedDevice, wattage: parseInt(e.target.value) || 0 })}
              min={editedDevice.minWattage}
              max={editedDevice.maxWattage}
            />
            <p className="text-xs text-muted-foreground">
              Range: {editedDevice.minWattage}W - {editedDevice.maxWattage}W
            </p>
          </div>

          {/* Daily Usage */}
          <div className="space-y-2">
            <Label htmlFor="hoursPerDay">Daily Usage (Hours)</Label>
            <Input
              id="hoursPerDay"
              type="number"
              value={editedDevice.hoursPerDay}
              onChange={(e) => setEditedDevice({ ...editedDevice, hoursPerDay: parseInt(e.target.value) || 1 })}
              min={1}
              max={24}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                onDelete(editedDevice.instanceId);
                onClose();
              }}
            >
              Remove Device
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
