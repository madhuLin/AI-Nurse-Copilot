"use client";
import { mockPatients } from "@/lib/mockData";
import { BottomNav } from "@/components/BottomNav";
import { VitalCard } from "@/components/VitalCard";
import { 
  ChevronLeft, Mic, History, ClipboardCheck, AlertCircle, 
  Stethoscope, Thermometer, Droplets, Info, ShieldAlert, Activity, Gauge
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find(p => p.id === params.id) || mockPatients[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Top Profile Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/mobile" className="bg-slate-50 p-2 rounded-full text-slate-400">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-800">病人詳細資訊</h1>
        </div>

        <div className="flex items-start gap-5">
          <div className="h-20 w-20 bg-medical-50 rounded-[2rem] flex items-center justify-center border border-medical-100 shrink-0">
            <span className="text-2xl font-black text-medical-primary">{patient.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{patient.bed}</span>
              <span className={`h-2 w-2 rounded-full ${patient.riskStatus === 'high' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-1">{patient.name}</h2>
            <p className="text-sm text-slate-500 font-medium">{patient.age} 歲 · {patient.gender === 'M' ? '男性' : '女性'}</p>
          </div>
        </div>

        {/* Theme 2 & 3: AI Risk & Workload Badges */}
        <div className="flex gap-2 mt-6">
          <div className="flex-1 bg-red-50 border border-red-100 px-3 py-3 rounded-2xl flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0">
               <svg className="h-full w-full" viewBox="0 0 36 36">
                 <path className="stroke-red-100 fill-none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path className="stroke-red-500 fill-none" strokeWidth="3" strokeDasharray={`${patient.riskScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-red-600">{patient.riskScore}</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-red-400 uppercase leading-none">風險指數</p>
              <p className="text-xs font-bold text-red-600">AI 高風險</p>
            </div>
          </div>
          <div className="flex-1 bg-medical-50 border border-medical-100 px-3 py-3 rounded-2xl flex items-center gap-2">
            <div className="bg-medical-primary/10 p-2 rounded-xl text-medical-primary">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-medical-400 uppercase leading-none">照護負荷</p>
              <p className="text-xs font-bold text-medical-600">{patient.workloadPoints} 點數</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-8">
        {/* Diagnosis Card */}
        <section>
          <div className="flex items-center gap-2 mb-4 ml-2">
            <Stethoscope className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">診斷與入院原因</h3>
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-2">{patient.diagnosis}</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              患者因急性胸痛入院，心電圖顯示 ST 段上升，經緊急心導管手術後轉入 ICU 觀察。目前生命徵象穩定，需持續監測心律與血氧狀態。
            </p>
          </div>
        </section>

        {/* Latest Vitals Summary */}
        <section>
          <div className="flex justify-between items-center mb-4 ml-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">最新生命徵象</h3>
            </div>
            <Link href="/mobile/vitals" className="text-[10px] font-black text-medical-primary uppercase">查看趨勢圖</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {patient.vitals.slice(0, 4).map((v, i) => (
              <VitalCard key={i} vital={v} />
            ))}
          </div>
        </section>

        {/* Action History Timeline */}
        <section>
          <div className="flex items-center gap-2 mb-4 ml-2">
            <History className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">最近護理紀錄</h3>
          </div>
          <div className="space-y-4">
            {[
              { time: "10:30 AM", type: "語音紀錄", nurse: "陳曉雲", content: "給予止痛藥物 Morphine 5mg IV, 患者疼痛緩解。" },
              { time: "08:15 AM", type: "常規評估", nurse: "李大明", content: "傷口無滲液，點滴滴注順暢，意識清楚。" }
            ].map((record, i) => (
              <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-50 shadow-sm flex gap-4">
                <div className="text-center shrink-0">
                  <p className="text-[10px] font-black text-slate-300 uppercase">{record.time.split(' ')[1]}</p>
                  <p className="text-xs font-black text-slate-400">{record.time.split(' ')[0]}</p>
                </div>
                <div className="w-px h-10 bg-slate-100 my-auto"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black bg-medical-50 text-medical-primary px-2 py-0.5 rounded-full uppercase">{record.type}</span>
                    <span className="text-[10px] font-bold text-slate-300">By {record.nurse}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 line-clamp-1">{record.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-24 left-6 right-6 z-40">
        <Link href={`/mobile/record/${patient.id}`}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-medical-primary text-white py-5 rounded-[2rem] font-bold shadow-2xl shadow-medical-primary/40 flex items-center justify-center gap-3"
          >
            <Mic className="h-6 w-6" /> 進入語音紀錄工作站
          </motion.button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
