export const StudySkeleton = () => (
  <div className="space-y-10 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div 
        key={i} 
        className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm"
      >
        <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
          <div className="h-3 w-20 bg-slate-200 rounded-full" />
          <div className="h-4 w-32 bg-slate-200 rounded-full" />
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-slate-100 rounded-3xl h-[300px] w-full" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-36 bg-slate-200 rounded-xl" />
            <div className="h-10 w-36 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    ))}
  </div>
);