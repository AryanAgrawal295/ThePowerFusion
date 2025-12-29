import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DeviceDistributionProps {
  trendMode: "day" | "device" | "month";
}

const deviceData = [
  { name: "Air Conditioner", value: 45, units: 135, color: "hsl(var(--primary))" },
  { name: "Refrigerator", value: 20, units: 60, color: "hsl(var(--accent))" },
  { name: "Lighting", value: 15, units: 45, color: "#f59e0b" },
  { name: "Washing Machine", value: 10, units: 30, color: "#8b5cf6" },
  { name: "Other", value: 10, units: 30, color: "#64748b" },
];

export const DeviceDistribution = ({ trendMode }: DeviceDistributionProps) => {
  const getTrendLabel = () => {
    switch (trendMode) {
      case "day":
        return "Today's Usage";
      case "device":
        return "Last 40 Days Usage";
      case "month":
        return "Monthly Usage";
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full flex flex-col">
      <h3 className="font-semibold text-foreground mb-2">Device Power Usage</h3>
      <p className="text-sm text-muted-foreground mb-4">{getTrendLabel()}</p>

      {/* Pie Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Share"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Device Usage Summary */}
      <div className="mt-4 space-y-3">
        <h4 className="text-sm font-medium text-foreground">Usage Summary</h4>
        <div className="space-y-2">
          {deviceData.map((device) => (
            <div
              key={device.name}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: device.color }}
                />
                <span className="text-sm text-foreground">{device.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">{device.units} kWh</span>
                <span className="text-xs text-muted-foreground ml-2">({device.value}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
