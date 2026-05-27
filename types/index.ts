export interface VitalSign {
  name: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface Patient {
  id: string;
  bed: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  diagnosis: string;
  riskStatus: 'low' | 'medium' | 'high';
  riskScore: number;
  workloadPoints: number;
  category: 'ICU' | 'ER' | 'Ward';
  vitals: VitalSign[];
}

export interface SOAP {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface SBAR {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
}
