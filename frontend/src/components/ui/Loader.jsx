import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 20, className = '' }) => (
  <Loader2 size={size} className={`animate-spin text-primary ${className}`} />
);

export const FullPageLoader = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50">
    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
      <Spinner size={22} className="text-white" />
    </div>
    <p className="text-sm text-text-muted font-medium">{message}</p>
  </div>
);

export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
    <Spinner size={28} />
    <p className="text-sm text-text-muted">{message}</p>
  </div>
);

export const SkeletonLine = ({ className = '' }) => (
  <div className={`skeleton h-4 ${className}`} />
);

export const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center gap-3">
      <div className="skeleton w-10 h-10 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine className="w-3/4" />
        <SkeletonLine className="w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <SkeletonLine className="w-full" />
      <SkeletonLine className="w-5/6" />
      <SkeletonLine className="w-4/6" />
    </div>
  </div>
);

export const SkeletonReport = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const AIGeneratingLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
    <div className="relative">
      <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center">
        <span className="text-white font-display text-2xl">CL</span>
      </div>
      <div className="absolute -inset-2 rounded-2xl border-2 border-primary/20 animate-ping" />
    </div>
    <div className="text-center space-y-2">
      <h3 className="font-display text-xl text-text">Analyzing your profile</h3>
      <p className="text-sm text-text-muted max-w-xs">
        AI is reviewing your resume, job description, and building a personalized report…
      </p>
    </div>
    <div className="flex gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          style={{ animation: `pulse 1.2s ease-in-out ${i * 0.15}s infinite` }}
        />
      ))}
    </div>
    <div className="w-64 bg-border rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-primary rounded-full"
        style={{ animation: 'progress 3s ease-in-out infinite' }}
      />
    </div>
    <style>{`
      @keyframes progress {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 95%; }
      }
    `}</style>
  </div>
);

export default Spinner;
