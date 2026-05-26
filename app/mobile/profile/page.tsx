"use client";
import { BottomNav } from "@/components/BottomNav";
import { User, Settings, Shield, Bell, Moon, LogOut, ChevronRight, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="bg-medical-primary pt-16 pb-12 px-8 rounded-b-[3rem] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <BrainCircuit className="h-64 w-64 -mr-20 -mt-10" />
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-[2rem] border-2 border-white/30 flex items-center justify-center overflow-hidden">
             <div className="h-full w-full bg-medical-200"></div>
          </div>
          <div>
            <h1 className="text-2xl font-black">陳曉雲</h1>
            <p className="text-white/70 font-bold text-sm">ICU 護理師 / 護理長</p>
            <div className="mt-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 w-fit">
              Staff ID: 9527
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 flex justify-around">
          <div className="text-center p-2">
            <div className="text-xl font-black text-slate-800">48</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">今日紀錄</div>
          </div>
          <div className="w-px h-8 bg-slate-100 my-auto"></div>
          <div className="text-center p-2">
            <div className="text-xl font-black text-slate-800">3.5h</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">節省時間</div>
          </div>
          <div className="w-px h-8 bg-slate-100 my-auto"></div>
          <div className="text-center p-2">
            <div className="text-xl font-black text-slate-800">12</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">預警處理</div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-6">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">系統設定</h3>
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
            {[
              { icon: Bell, label: "通知提醒", value: "開啟" },
              { icon: Moon, label: "夜間模式", value: "自動" },
              { icon: BrainCircuit, label: "AI 靈敏度", value: "高" },
              { icon: Shield, label: "資料加密", value: "軍規級" },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center justify-between p-5 ${i !== 3 ? 'border-b border-slate-50' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 p-2 rounded-xl text-slate-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{item.value}</span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <button className="w-full bg-white rounded-[2.5rem] p-5 flex items-center gap-4 text-red-500 font-bold border border-red-50 shadow-sm mb-10">
          <div className="bg-red-50 p-2 rounded-xl">
            <LogOut className="h-5 w-5" />
          </div>
          <span>登出系統</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
