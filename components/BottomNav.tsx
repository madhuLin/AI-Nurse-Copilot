"use client";
import { Home, Mic, Activity, User, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
  const pathname = usePathname();
  
  const navItems = [
    { icon: Home, label: "首頁", path: "/mobile" },
    { icon: Activity, label: "生命徵象", path: "/mobile/vitals" },
    { icon: Mic, label: "語音", path: "/mobile/record", primary: true },
    { icon: ClipboardList, label: "SBAR", path: "/mobile/sbar" },
    { icon: User, label: "帳號", path: "/mobile/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 safe-area-bottom flex justify-between items-center z-50">
      {navItems.map((item, i) => {
        const isActive = pathname === item.path;
        if (item.primary) {
          return (
            <Link key={i} href={item.path} className="relative -top-8">
              <div className="bg-medical-primary p-4 rounded-full shadow-lg shadow-medical-primary/40 text-white">
                <item.icon className="h-7 w-7" />
              </div>
            </Link>
          );
        }
        return (
          <Link key={i} href={item.path} className="flex flex-col items-center gap-1">
            <item.icon className={`h-5 w-5 ${isActive ? 'text-medical-primary' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-medical-primary' : 'text-slate-400'}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
