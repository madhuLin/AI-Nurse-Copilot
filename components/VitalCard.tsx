"use client";
import { VitalSign } from "@/types";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export const VitalCard = ({ vital }: { vital: VitalSign }) => {
  const statusColors = {
    normal: "text-slate-800",
    warning: "text-amber-500",
    critical: "text-red-500",
  };

  const bgColors = {
    normal: "bg-white",
    warning: "bg-amber-50",
    critical: "bg-red-50",
  };

  return (
    <div className={`${bgColors[vital.status]} p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-28`}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-slate-400 uppercase">{vital.name}</span>
        {vital.trend === 'up' && <ArrowUp className="h-3 w-3 text-slate-300" />}
        {vital.trend === 'down' && <ArrowDown className="h-3 w-3 text-slate-300" />}
        {vital.trend === 'stable' && <Minus className="h-3 w-3 text-slate-300" />}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold ${statusColors[vital.status]}`}>{vital.value}</span>
          <span className="text-[10px] text-slate-400">{vital.unit}</span>
        </div>
        {vital.status !== 'normal' && (
          <span className="text-[10px] font-medium text-red-400 block mt-1 animate-pulse">異常警告</span>
        )}
      </div>
    </div>
  );
};
