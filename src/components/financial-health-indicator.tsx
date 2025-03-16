"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

interface FinancialHealthProps {
  profitMargin?: number;
  netCashFlow?: number;
  status?: string;
}

export default function FinancialHealthIndicator({
  profitMargin = 15.5,
  netCashFlow = 8550,
  status = "Good",
}: FinancialHealthProps) {
  const [healthColor, setHealthColor] = useState("text-yellow-600");
  const [healthBg, setHealthBg] = useState("bg-yellow-100");
  const [icon, setIcon] = useState(
    <TrendingUp className="h-6 w-6 text-yellow-600" />,
  );

  useEffect(() => {
    if (status === "Excellent" || profitMargin > 20) {
      setHealthColor("text-green-600");
      setHealthBg("bg-green-100");
      setIcon(<CheckCircle className="h-6 w-6 text-green-600" />);
    } else if (status === "Good" || (profitMargin > 10 && profitMargin <= 20)) {
      setHealthColor("text-blue-600");
      setHealthBg("bg-blue-100");
      setIcon(<TrendingUp className="h-6 w-6 text-blue-600" />);
    } else if (status === "Fair" || (profitMargin > 0 && profitMargin <= 10)) {
      setHealthColor("text-yellow-600");
      setHealthBg("bg-yellow-100");
      setIcon(<TrendingUp className="h-6 w-6 text-yellow-600" />);
    } else {
      setHealthColor("text-red-600");
      setHealthBg("bg-red-100");
      setIcon(<AlertTriangle className="h-6 w-6 text-red-600" />);
    }
  }, [status, profitMargin]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={`${healthBg} p-3 rounded-full`}>{icon}</div>
          <div>
            <p className={`text-2xl font-bold ${healthColor}`}>{status}</p>
            <div className="flex flex-col text-sm text-gray-500">
              <span>Profit Margin: {profitMargin}%</span>
              <span>Net Cash Flow: ${netCashFlow.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${profitMargin > 20 ? "bg-green-600" : profitMargin > 10 ? "bg-blue-600" : profitMargin > 0 ? "bg-yellow-600" : "bg-red-600"} h-2.5 rounded-full`}
              style={{
                width: `${Math.min(Math.max(profitMargin * 2, 5), 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
