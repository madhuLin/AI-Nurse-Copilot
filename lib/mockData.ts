import { Patient } from "@/types";

export const mockPatients: Patient[] = [
  {
    id: "1",
    bed: "ICU-01",
    name: "陳曉明",
    age: 65,
    gender: "M",
    diagnosis: "急性心肌梗塞 (AMI)",
    riskStatus: "high",
    vitals: [
      { name: "BP", value: "142/88", unit: "mmHg", status: "warning", trend: "up" },
      { name: "HR", value: 92, unit: "bpm", status: "normal", trend: "stable" },
      { name: "SpO2", value: 94, unit: "%", status: "warning", trend: "down" },
      { name: "Temp", value: 37.8, unit: "°C", status: "normal", trend: "up" },
    ]
  },
  {
    id: "2",
    bed: "ICU-05",
    name: "林佩君",
    age: 42,
    gender: "F",
    diagnosis: "敗血性休克 (Septic Shock)",
    riskStatus: "high",
    vitals: [
      { name: "BP", value: "95/60", unit: "mmHg", status: "critical", trend: "down" },
      { name: "HR", value: 115, unit: "bpm", status: "critical", trend: "up" },
      { name: "SpO2", value: 91, unit: "%", status: "critical", trend: "down" },
      { name: "Temp", value: 39.2, unit: "°C", status: "critical", trend: "up" },
    ]
  },
  {
    id: "3",
    bed: "WARD-12",
    name: "王大同",
    age: 78,
    gender: "M",
    diagnosis: "慢性阻塞性肺病 (COPD)",
    riskStatus: "medium",
    vitals: [
      { name: "BP", value: "128/80", unit: "mmHg", status: "normal", trend: "stable" },
      { name: "HR", value: 78, unit: "bpm", status: "normal", trend: "stable" },
      { name: "SpO2", value: 96, unit: "%", status: "normal", trend: "stable" },
      { name: "Temp", value: 36.6, unit: "°C", status: "normal", trend: "stable" },
    ]
  }
];

export const mockStats = {
  voiceRecordsToday: 48,
  timeSaved: "3.5 hrs",
  aiUsageRate: "92%",
  workloadReduction: "25%",
  alertCount: 12
};
