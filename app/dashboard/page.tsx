"use client";
import { mockPatients, mockStats } from "@/lib/mockData";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Activity, Users, Clock, Zap, AlertTriangle, TrendingDown, 
  MessageSquare, BrainCircuit, Search, Bell, Settings
} from "lucide-react";

const chartData = [
  { name: '08:00', records: 12, efficiency: 85 },
  { name: '10:00', records: 18, efficiency: 92 },
  { name: '12:00', records: 15, efficiency: 88 },
  { name: '14:00', records: 22, efficiency: 95 },
  { name: '16:00', records: 25, efficiency: 94 },
  { name: '18:00', records: 14, efficiency: 90 },
];

export default function DashboardPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-medical-primary p-2 rounded-xl text-white">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <span className="font-black text-xl text-slate-800">AI Nursing</span>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { icon: Activity, label: "即時總覽", active: true },
            { icon: Users, label: "病人列表" },
            { icon: MessageSquare, label: "語音紀錄庫" },
            { icon: AlertTriangle, label: "異常追蹤" },
            { icon: TrendingDown, label: "負擔分析" },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                item.active ? "bg-medical-primary text-white shadow-lg shadow-medical-primary/30" : "text-slate-400 hover:bg-slate-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-50 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 text-sm font-bold">
            <Settings className="h-5 w-5" /> 設定
          </button>
          <div className="p-4 bg-slate-50 rounded-3xl mt-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">當前使用者</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-medical-200 rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-slate-800">陳曉雲</p>
                <p className="text-[10px] text-slate-400">ICU 護理長</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-10 max-h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800">單位即時看板</h1>
            <p className="text-slate-400 font-medium">智慧醫療自動化：ICU 01 護理站</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input 
                type="text" 
                placeholder="搜尋病人、病歷號..." 
                className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm w-64 shadow-sm"
              />
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm relative">
              <Bell className="h-6 w-6 text-slate-400" />
              <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full"></span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "今日語音紀錄數", value: mockStats.voiceRecordsToday, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "AI 使用涵蓋率", value: mockStats.aiUsageRate, icon: Zap, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "節省文書總時數", value: mockStats.timeSaved, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "異常警告追蹤中", value: mockStats.alertCount, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl w-fit mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-slate-400 text-sm font-bold mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-800">AI 效率與紀錄產量趨勢</h3>
              <select className="bg-slate-50 border-none text-sm font-bold rounded-xl px-4 py-2">
                <option>今日 (24h)</option>
                <option>近一週</option>
              </select>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area type="monotone" dataKey="records" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorRec)" />
                  <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={4} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Theme 2: Risk Heatmap Placeholder */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-6">全區風險預警圖</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[...Array(12)].map((_, i) => {
                const isHigh = i === 0 || i === 4;
                const isMedium = i === 2 || i === 8;
                return (
                  <div key={i} className={`aspect-square rounded-xl flex flex-col items-center justify-center border ${
                    isHigh ? 'bg-red-50 border-red-100 text-red-600' : 
                    isMedium ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                    'bg-slate-50 border-slate-100 text-slate-300'
                  }`}>
                    <span className="text-[10px] font-black">{i + 1 < 10 ? `0${i+1}` : i+1}</span>
                    <Activity className={`h-3 w-3 mt-1 ${isHigh ? 'animate-pulse' : ''}`} />
                  </div>
                );
              })}
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-6">主題 3: 護理負荷分配</h3>
            <div className="space-y-4">
               {['陳曉雲', '李大明', '張小美'].map((name, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-600">{name}</span>
                      <span className="text-slate-400">{80 - i*15}% 負載</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${i === 0 ? 'bg-red-500' : 'bg-medical-primary'}`} 
                        style={{ width: `${80 - i*15}%` }}
                      ></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
