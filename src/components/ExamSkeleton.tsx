export const ExamSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className="h-36 bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between animate-pulse"
      >
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-slate-200" />
          <div className="w-4 h-4 rounded bg-slate-100" />
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded-md w-3/4" />
          <div className="h-3 bg-slate-100 rounded-md w-1/4" />
        </div>
      </div>
    ))}
  </div>
);