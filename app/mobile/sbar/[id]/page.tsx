"use client";
import { useState, useEffect } from "react";
import { mockPatients } from "@/lib/mockData";
import { BottomNav } from "@/components/BottomNav";
import { ChevronLeft, Share2, Copy, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SBARPage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find(p => p.id === params.id) || mockPatients[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const sbarData = {
    situation: `目前為 ${patient.bed} ${patient.name} 術後第一天，生命徵象尚穩定，但 SpO2 有下降趨勢。`,
    background: `患者診斷為 ${patient.diagnosis}，昨日下午進行 PCI 手術，目前使用 Heparin 滴注中。`,
    assessment: `意識清楚，呼吸音較粗，痰液黏稠，SpO2 94% (Room Air)，BP 142/88。`,
    recommendation: `建議給予 Nasal Cannula 2L/min，並追蹤 2 小時後之 SpO2 與心導管傷口。`
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 flex items-center justify-between">
        <Link href={`/mobile/record/${patient.id}`}>
          <ChevronLeft className="h-6 w-6 text-slate-400" />
        </Link>
        <h1 className="text-lg font-bold text-slate-800">AI 交班摘要 (SBAR)</h1>
        <Share2 className="h-5 w-5 text-medical-primary" />
      </div>

      <div className="px-6 mt-6">
        <div className="bg-medical-primary p-6 rounded-[2rem] text-white shadow-lg shadow-medical-primary/20 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold opacity-80">AI 智能分析報告</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">{patient.name}</h2>
          <p className="text-sm opacity-90">{patient.bed} · {patient.diagnosis}</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shimmer h-32"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {Object.entries(sbarData).map(([key, value]) => (
              <div key={key} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative group">
                <span className="text-[10px] font-black text-medical-primary uppercase tracking-widest block mb-2">
                  {key === 'situation' ? 'Situation 情況' : 
                   key === 'background' ? 'Background 背景' : 
                   key === 'assessment' ? 'Assessment 評估' : 'Recommendation 建議'}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">{value}</p>
                <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-4 w-4 text-slate-300" />
                </button>
              </div>
            ))}
          </motion.div>
        )}

        <div className="mt-8">
          <button className="w-full bg-slate-800 text-white py-5 rounded-3xl font-bold shadow-xl flex items-center justify-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            完成交班紀錄
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
