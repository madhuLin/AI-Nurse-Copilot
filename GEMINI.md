# Project Context: AI Nurse Copilot (Healthcare Prototype)

This document provides a high-level overview for AI agents to quickly understand the project architecture, data flow, and UI/UX standards.

## 🎯 Project Objective
A high-fidelity frontend prototype for a medical competition. It demonstrates an AI-powered nursing assistant that automates clinical documentation (SOAP) via voice and generates handover summaries (SBAR) to reduce nursing workload in ICU/ER environments.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (Core to the "AI Experience")
- **Visuals**: Lucide React (Icons), Recharts (Stats)
- **Design System**: Apple-like medical aesthetic (Clean, glassmorphism, high-contrast typography).

## 📂 Directory Structure
- `/app`: Main application routes.
    - `/mobile`: Bedside nursing workflow (Mobile-first).
        - `/patient/[id]`: Patient details & clinical history.
        - `/record/[id]`: Core voice recording & AI SOAP generation.
        - `/sbar/[id]`: AI-generated handover summary.
        - `/vitals`: Unit-wide vital signs monitoring.
    - `/dashboard`: Desktop administrative view for nursing managers.
- `/components`: Reusable UI components (PatientCard, VitalCard, BottomNav).
- `/lib`: Mock data store (`mockData.ts`).
- `/types`: Domain interfaces (`Patient`, `VitalSign`, `SOAP`, `SBAR`).

## 🔄 Data Flow & State
1. **Mock Data**: Centralized in `lib/mockData.ts`. Used across mobile and desktop views.
2. **Patient Context**: Passed via URL parameters (`[id]`).
3. **Simulation Logic**: 
    - AI analysis is simulated using `setTimeout` and local state (`step` index).
    - Transcription is simulated via a character-by-character interval.
4. **Human-in-the-Loop**: The `SOAP` records in `record/[id]` are editable via a local toggle (`isEditing`), allowing nurses to correct AI output.

## 🎨 UI/UX Standards (Mandatory)
- **Colors**: Primary (`#0ea5e9`), Secondary/Emerald (`#10b981`), Danger/Alert (`#f43f5e`), Background (`#f8fafc`).
- **Cards**: Large border radius (`3xl` or `4xl`), subtle shadows, glassmorphism effects (`bg-white/80 backdrop-blur-md`).
- **Interactions**:
    - Use `framer-motion` for all transitions.
    - Mobile: Must support single-hand operation (Bottom CTA buttons, large touch targets).
    - Desktop: Focus on data density and visual trend analysis.

## 🧠 AI Simulation Workflow
When an agent is asked to modify the AI logic:
- The workflow follows: `Idle` -> `Recording` (Transcribing) -> `Analyzing` (Loading) -> `Completed` (SOAP Result).
- Maintain the "Clinical Gaze": Use professional medical terminology in all AI-generated mocks.

## 🛠 Development Guidelines
- **Surgical Updates**: Only modify the specific requested component.
- **Consistency**: Adhere to the established `medical-primary` color palette in `tailwind.config.ts`.
- **Validation**: Ensure all new clinical fields are typed in `/types/index.ts`.
