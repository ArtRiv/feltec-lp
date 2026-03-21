import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  index: number;
  children: ReactNode;
}

const FormSection = ({ title, index, children }: FormSectionProps) => {
  return (
    <div className="rounded-[1.5rem] border border-white/5 bg-brand-dark p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* subtle noise texture matching the app layout */}
      <div className="absolute inset-0 w-full h-full opacity-30 bg-noise mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative flex items-center gap-4 pb-4 border-b border-white/10 z-10">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white text-sm font-bold glow-brand-sm">
          {index}
        </span>
        <h2 className="text-xl font-medium tracking-tight text-white/90">{title}</h2>
      </div>
      <div className="relative space-y-6 z-10">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
