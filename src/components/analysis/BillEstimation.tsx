import { Zap, IndianRupee, Clock, TrendingUp } from "lucide-react";

interface BillEstimationProps {
  trendMode: "day" | "device" | "month";
  roomName: string;
}

export const BillEstimation = ({ trendMode, roomName }: BillEstimationProps) => {
  const getBillData = () => {
    switch (trendMode) {
      case "day":
        return {
          energy: 12.5,
          cost: 100,
          period: "Today",
          avgRate: 8,
        };
      case "device":
        return {
          energy: 300,
          cost: 2400,
          period: "Last 40 Days",
          avgRate: 8,
        };
      case "month":
        return {
          energy: 450,
          cost: 3600,
          period: "This Month",
          avgRate: 8,
        };
    }
  };

  const billData = getBillData();

  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <h3 className="font-semibold text-foreground mb-2">Bill Estimation</h3>
      <p className="text-sm text-muted-foreground mb-4">{roomName} - {billData.period}</p>

      <div className="grid grid-cols-2 gap-4">
        {/* Energy Consumed */}
        <div className="p-4 rounded-xl bg-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Energy Consumed</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{billData.energy} kWh</p>
        </div>

        {/* Estimated Cost */}
        <div className="p-4 rounded-xl bg-accent/10">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Estimated Cost</span>
          </div>
          <p className="text-2xl font-bold text-accent">₹{billData.cost}</p>
        </div>

        {/* Period */}
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Period</span>
          </div>
          <p className="text-lg font-medium text-foreground">{billData.period}</p>
        </div>

        {/* Average Rate */}
        <div className="p-4 rounded-xl bg-secondary/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Avg. Rate</span>
          </div>
          <p className="text-lg font-medium text-foreground">₹{billData.avgRate}/kWh</p>
        </div>
      </div>

      {/* Tariff Note */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        * Bill calculation based on ₹{billData.avgRate}/kWh. Actual tariff may vary.
      </p>
    </div>
  );
};
