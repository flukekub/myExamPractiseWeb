export const QuestionSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="bg-white border border-slate-200 rounded-[2rem] p-4 shadow-sm">
      <div className="bg-slate-100 rounded-[1.5rem] h-[350px] w-full" />
    </div>

    <div className="bg-white/50 p-6 rounded-3xl border border-slate-100">
      <div className="flex justify-center gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 w-20 bg-slate-200 rounded-full" />
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
      <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
      <div className="h-4 w-24 bg-slate-100 rounded-full" />
      <div className="h-12 w-32 bg-slate-200 rounded-2xl" />
    </div>
  </div>
);