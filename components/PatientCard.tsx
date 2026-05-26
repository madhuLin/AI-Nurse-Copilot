"use client";
import { Patient } from "@/types";
import { ChevronRight, Activity, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const PatientCard = ({ patient, onClick }: { patient: Patient, onClick?: () => void }) => {
  const riskColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-3 flex items-center justify-between cursor-pointer"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded-full text-slate-500 uppercase tracking-wider">
            {patient.bed}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColors[patient.riskStatus]}`}>
            {patient.riskStatus === 'high' ? '高風險' : patient.riskStatus === 'medium' ? '中風險' : '低風險'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800">{patient.name} <span className="text-slate-400 font-normal text-sm">{patient.age}y {patient.gender}</span></h3>
        <p className="text-sm text-slate-500 line-clamp-1">{patient.diagnosis}</p>
        
        <div className="flex gap-4 mt-3">
          {patient.vitals.slice(0, 2).map((v, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">{v.name}</span>
              <span className={`text-xs font-bold ${v.status !== 'normal' ? 'text-red-500' : 'text-slate-700'}`}>
                {v.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ChevronRight className="text-slate-300 h-5 w-5" />
    </motion.div>
  );
};
