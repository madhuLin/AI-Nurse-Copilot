"use client";
import { mockPatients } from "@/lib/mockData";
import { BottomNav } from "@/components/BottomNav";
import { VitalCard } from "@/components/VitalCard";
import { Activity, AlertTriangle, ChevronRight, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VitalsPage() {
  const criticalPatients = mockPatients.filter(p => p.riskStatus === 'high');

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">生命徵象監測</h1>
          <div className="bg-slate-100 p-2 rounded-xl text-slate-500">
            <Filter className="h-5 w-5" />
          </div>
        </div>

        {/* Status Summary */}
        <div className="flex gap-4">
          <div className="flex-1 bg-red-50 p-4 rounded-3xl border border-red-100">
            <span className="text-[10px] font-black text-red-500 uppercase block mb-1">Critical</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-red-600">{criticalPatients.length}</span>
              <span className="text-xs text-red-400 font-bold">Patients</span>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Stable</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-700">{mockPatients.length - criticalPatients.length}</span>
              <span className="text-xs text-slate-400 font-bold">Patients</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-8">
        {mockPatients.map((patient) => (
          <div key={patient.id}>
            <div className="flex justify-between items-end mb-4 px-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`h-2 w-2 rounded-full ${patient.riskStatus === 'high' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{patient.bed}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{patient.name}</h3>
              </div>
              <Link href={`/mobile/record/${patient.id}`} className="text-xs font-bold text-medical-primary flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                查看詳情 <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 gap-3">
              {patient.vitals.map((v, i) => (
                <VitalCard key={i} vital={v} />
              ))}
            </div>

            {/* AI Insight Badge */}
            {patient.riskStatus === 'high' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-medical-primary/10 border border-medical-primary/20 p-3 rounded-2xl flex items-start gap-3"
              >
                <AlertTriangle className="h-5 w-5 text-medical-primary shrink-0" />
                <p className="text-[11px] text-medical-primary font-bold leading-tight">
                  AI 預警：SpO₂ 持續下降且心率偏高，疑似敗血症風險增加，建議立即評估呼吸狀態。
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
