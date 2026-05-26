"use client";
import { useState, useEffect } from "react";
import { mockPatients } from "@/lib/mockData";
import { BottomNav } from "@/components/BottomNav";
import { VitalCard } from "@/components/VitalCard";
import { Mic, Square, Sparkles, ChevronLeft, Save, RotateCcw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function VoiceRecordPage({ params }: { params: { id: string } }) {
  const patient = mockPatients.find(p => p.id === params.id) || mockPatients[0];
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [step, setStep] = useState(0); // 0: idle, 1: recording, 2: analyzing, 3: completed
  const [isEditing, setIsEditing] = useState(false);
  const [soap, setSoap] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });

  const handleSoapChange = (key: string, value: string) => {
    setSoap(prev => ({ ...prev, [key]: value }));
  };

  const startRecording = () => {
    setIsRecording(true);
    setStep(1);
    setTranscription("");
    
    // Simulate real-time transcription
    const text = "病人目前意識清楚，血壓 128/80，心跳 92，血氧 96%，右手點滴順暢，無紅腫滲漏，主訴傷口疼痛約三分，已協助調整姿勢並持續觀察。";
    let i = 0;
    const interval = setInterval(() => {
      setTranscription(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    setStep(2);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(3);
      setSoap({
        subjective: "意識清楚，主訴傷口疼痛。",
        objective: "BP 128/80, SpO2 96%, 右手點滴滴注順暢。",
        assessment: "術後狀況尚屬穩定，疼痛控制中。",
        plan: "持續監測生命徵象，追蹤疼痛緩解情形。"
      });
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 flex items-center justify-between">
        <Link href="/mobile">
          <ChevronLeft className="h-6 w-6 text-slate-400" />
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-800">{patient.bed} 紀錄</h1>
          <p className="text-xs text-slate-400">{patient.name} · {patient.diagnosis}</p>
        </div>
        <div className="w-6"></div>
      </div>

      <div className="px-6 mt-4">
        {/* Vitals Summary */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {patient.vitals.map((v, i) => (
            <div key={i} className="bg-white p-2 rounded-2xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{v.name}</span>
              <span className={`text-sm font-bold ${v.status !== 'normal' ? 'text-red-500' : 'text-slate-700'}`}>{v.value}</span>
            </div>
          ))}
        </div>

        {/* Recording Area */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-6">
                <Mic className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">準備好開始了嗎？</h3>
              <p className="text-sm text-slate-400 px-8">點擊下方按鈕開始記錄床邊護理內容</p>
            </motion.div>
          )}

          {step === 1 && (
            <div className="w-full">
              <div className="flex items-center gap-2 mb-6 bg-red-50 text-red-500 px-3 py-1 rounded-full w-fit mx-auto text-[10px] font-black uppercase tracking-widest">
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                AI Listening Now
              </div>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-red-100 rounded-full"
                  />
                  <div className="relative bg-red-500 p-4 rounded-full text-white">
                    <Mic className="h-8 w-8" />
                  </div>
                </div>
              </div>
              <div className="h-32 overflow-y-auto">
                <p className="text-slate-800 font-medium leading-relaxed italic text-center">
                  "{transcription}"
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-5 bg-medical-primary ml-1 align-middle"
                  />
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mb-6 inline-block"
              >
                <Sparkles className="h-12 w-12 text-medical-primary" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AI 智能分析中</h3>
              <p className="text-sm text-slate-400">正在將語音轉化為結構化 SOAP 紀錄...</p>
              
              <div className="mt-8 flex gap-2 justify-center">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="h-1.5 w-8 bg-medical-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  <CheckCircle2 className="h-3 w-3" />
                  AI 自動生成完成
                </div>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[10px] font-black text-medical-primary uppercase flex items-center gap-1 border border-medical-100 px-2 py-1 rounded-lg"
                >
                  {isEditing ? "完成編輯" : "編輯紀錄"}
                </button>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(soap).map(([key, value]) => (
                  <div key={key} className="border-b border-slate-50 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{key}</span>
                    {isEditing ? (
                      <textarea
                        className="w-full text-sm text-slate-800 font-medium bg-slate-50 p-2 rounded-xl border-none focus:ring-1 focus:ring-medical-primary mt-1"
                        rows={2}
                        value={value}
                        onChange={(e) => handleSoapChange(key, e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-slate-800 font-medium mt-1">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center">
          {step === 0 && (
            <button 
              onClick={startRecording}
              className="bg-medical-primary text-white flex items-center gap-3 px-10 py-5 rounded-full shadow-xl shadow-medical-primary/40 font-bold text-lg"
            >
              <Mic className="h-6 w-6" /> 開始錄音
            </button>
          )}

          {step === 1 && (
            <button 
              onClick={stopRecording}
              className="bg-red-500 text-white flex items-center gap-3 px-10 py-5 rounded-full shadow-xl shadow-red-500/40 font-bold text-lg"
            >
              <Square className="h-6 w-6" /> 停止錄音
            </button>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3 w-full">
              <button 
                className="bg-medical-primary text-white flex items-center justify-center gap-3 w-full py-5 rounded-3xl shadow-xl shadow-medical-primary/40 font-bold text-lg"
              >
                <Save className="h-6 w-6" /> 確認送出紀錄
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(0)}
                  className="bg-white text-slate-500 border border-slate-100 flex items-center justify-center gap-2 flex-1 py-4 rounded-3xl font-bold"
                >
                  <RotateCcw className="h-5 w-5" /> 重新錄製
                </button>
                <Link 
                  href={`/mobile/sbar/${patient.id}`}
                  className="bg-emerald-500 text-white flex items-center justify-center gap-2 flex-1 py-4 rounded-3xl font-bold"
                >
                  <Sparkles className="h-5 w-5" /> 生成 SBAR
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
