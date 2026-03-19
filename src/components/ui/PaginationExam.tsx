"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationExam({
  onClick,
  pages,
  currentPage,
}: {
  onClick: (type: string) => void;
  pages: number;
  currentPage: number;
}) {
  return (
    <Pagination className="mt-12 select-none">
      <PaginationContent className="gap-2 sm:gap-3">
        
        {/* Previous Button */}
        <PaginationItem className={currentPage === 1 ? "opacity-30 pointer-events-none" : "cursor-pointer"}>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClick("previous");
            }}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all active:scale-95"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Prev</span>
          </button>
        </PaginationItem>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 bg-white/50 p-1 rounded-2xl border border-slate-100 shadow-sm">
          {Array.from({ length: pages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = currentPage === pageNumber;

            return (
              <PaginationItem key={pageNumber}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClick(`${pageNumber}`);
                  }}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-xl transition-all active:scale-90
                    ${isActive 
                      ? "bg-slate-900 text-white shadow-md shadow-slate-200 scale-105" 
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                    }`}
                >
                  {pageNumber}
                </button>
              </PaginationItem>
            );
          })}
        </div>

        {/* Next Button */}
        <PaginationItem className={currentPage === pages ? "opacity-30 pointer-events-none" : "cursor-pointer"}>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClick("next");
            }}
            className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all active:scale-95"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}