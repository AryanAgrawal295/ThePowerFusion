import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, CalendarDays } from "lucide-react";

interface TrendGraphProps {
  trendMode: "day" | "device" | "month";
  onTrendModeChange: (mode: "day" | "device" | "month") => void;
}

const dayWiseData = [
  { time: "6AM", usage: 0.5 },
  { time: "8AM", usage: 1.2 },
  { time: "10AM", usage: 0.8 },
  { time: "12PM", usage: 1.5 },
  { time: "2PM", usage: 2.1 },
  { time: "4PM", usage: 1.8 },
  { time: "6PM", usage: 2.5 },
  { time: "8PM", usage: 3.2 },
  { time: "10PM", usage: 2.0 },
  { time: "12AM", usage: 0.8 },
];

const deviceTrendData = Array.from({ length: 40 }, (_, i) => ({
  day: `Day ${i + 1}`,
  ac: Math.random() * 5 + 2,
  fridge: Math.random() * 2 + 1,
  lighting: Math.random() * 1 + 0.5,
  other: Math.random() * 2 + 0.5,
}));

const monthWiseData = [
  { month: "Jan", usage: 450 },
  { month: "Feb", usage: 420 },
  { month: "Mar", usage: 480 },
  { month: "Apr", usage: 520 },
  { month: "May", usage: 580 },
  { month: "Jun", usage: 650 },
  { month: "Jul", usage: 720 },
  { month: "Aug", usage: 680 },
  { month: "Sep", usage: 550 },
  { month: "Oct", usage: 480 },
  { month: "Nov", usage: 420 },
  { month: "Dec", usage: 460 },
];

export const TrendGraph = ({ trendMode, onTrendModeChange }: TrendGraphProps) => {
  const trendOptions = [
    { id: "day", label: "Day-wise", icon: Calendar },
    { id: "device", label: "Device Trend (40 Days)", icon: TrendingUp },
    { id: "month", label: "Month-wise", icon: CalendarDays },
  ] as const;

  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full flex flex-col">
      {/* Trend Mode Selector */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Power Usage Trend</h3>
        <div className="flex gap-2">
          {trendOptions.map((option) => (
            <Button
              key={option.id}
              variant={trendMode === option.id ? "default" : "outline"}
              size="sm"
              onClick={() => onTrendModeChange(option.id)}
              className="gap-2"
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Graph Area */}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {trendMode === "day" ? (
            <LineChart data={dayWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" kW" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          ) : trendMode === "device" ? (
            <LineChart data={deviceTrendData.slice(0, 20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" kW" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="ac" stroke="hsl(var(--primary))" strokeWidth={2} name="AC" />
              <Line type="monotone" dataKey="fridge" stroke="hsl(var(--accent))" strokeWidth={2} name="Fridge" />
              <Line type="monotone" dataKey="lighting" stroke="#f59e0b" strokeWidth={2} name="Lighting" />
              <Line type="monotone" dataKey="other" stroke="#8b5cf6" strokeWidth={2} name="Other" />
            </LineChart>
          ) : (
            <BarChart data={monthWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit=" kWh" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
