"use client";
import { PatientCard } from "@/components/PatientCard";
import { BottomNav } from "@/components/BottomNav";
import { mockPatients, mockStats } from "@/lib/mockData";
import { Bell, Search, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileHome() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-slate-400 text-sm font-medium">午安, 陳護理師</h2>
            <h1 className="text-2xl font-bold text-slate-800">ICU 護理工作站</h1>
          </div>
          <div className="relative">
            <div className="bg-slate-100 p-2 rounded-full">
              <Bell className="h-6 w-6 text-slate-600" />
            </div>
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["全部", "ICU", "急診", "一般病房"].map((tab, i) => (
            <button
              key={i}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                i === 0 ? "bg-medical-primary text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 grid grid-cols-2 gap-3 mt-6">
        <div className="bg-medical-primary/10 p-4 rounded-3xl border border-medical-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-medical-primary p-1.5 rounded-lg text-white">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-medical-primary">節省時間</span>
          </div>
          <div className="text-2xl font-black text-slate-800">{mockStats.timeSaved}</div>
          <p className="text-[10px] text-slate-400 font-medium">AI 文書處理自動化</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-emerald-600">完成紀錄</span>
          </div>
          <div className="text-2xl font-black text-slate-800">{mockStats.voiceRecordsToday}</div>
          <p className="text-[10px] text-slate-400 font-medium">今日語音完成總數</p>
        </div>
      </div>

      {/* Patient List */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">今日待理病人 ({mockPatients.length})</h3>
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        
        {mockPatients.map((patient) => (
          <PatientCard 
            key={patient.id} 
            patient={patient} 
            onClick={() => window.location.href = `/mobile/record/${patient.id}`}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
