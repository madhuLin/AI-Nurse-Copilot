"use client";
import Link from "next/link";
import { BrainCircuit, Smartphone, LayoutDashboard, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center mb-16"
      >
        <div className="bg-medical-primary w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-medical-primary/40">
          <BrainCircuit className="h-10 w-10" />
        </div>
        <h1 className="text-5xl lg:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          AI 護理語音紀錄<br/><span className="text-medical-primary">自動化系統</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          醫療競賽高擬真前端 Prototype。專為 ICU/急診床邊情境設計，
          透過語音 AI 自動生成 SOAP 與 SBAR，將護理師的雙手還給病人。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Mobile Entry */}
        <Link href="/mobile" className="group">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 h-full flex flex-col items-center text-center transition-all group-hover:border-medical-primary/30"
          >
            <div className="bg-blue-50 p-6 rounded-[2rem] text-medical-primary mb-8 group-hover:scale-110 transition-transform">
              <Smartphone className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">AI 護理工作站</h3>
            <p className="text-slate-400 font-medium mb-8">
              整合語音分析與自動化紀錄，專為臨床護理師設計的高效作業介面。
            </p>
            <div className="mt-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold group-hover:bg-medical-primary transition-colors">
              進入系統
            </div>
          </motion.div>
        </Link>

        {/* Desktop Entry */}
        <Link href="/dashboard" className="group">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 h-full flex flex-col items-center text-center transition-all group-hover:border-emerald-500/30"
          >
            <div className="bg-emerald-50 p-6 rounded-[2rem] text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
              <LayoutDashboard className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">大屏監控中心</h3>
            <p className="text-slate-400 font-medium mb-8">
              全單位數據視覺化監控，即時追蹤病患風險狀態與行政效率指標。
            </p>
            <div className="mt-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold group-hover:bg-emerald-500 transition-colors">
              進入監控中心
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
        <div className="flex items-center gap-2 font-bold text-slate-400">
          <Sparkles className="h-5 w-5" /> Next.js 14
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400">
          <ShieldCheck className="h-5 w-5" /> TypeScript
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400">
          <Zap className="h-5 w-5" /> Tailwind CSS
        </div>
      </div>
    </div>
  );
}
