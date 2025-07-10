import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <Pagination className="mt-8 ">
      <PaginationContent className="gap-4">
        {currentPage == 1 ? (
          <></>
        ) : (
          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              onClick("previous");
            }}
          >
            <PaginationPrevious
              href="#"
              className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg "
              style={{ borderRadius: '0.5rem' }}
            />
          </PaginationItem>
        )}
        {Array.from({ length: pages }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              href="#"
              className="px-4 py-3 text-lg font-medium min-w-[3rem] h-12 bg-gray-200 rounded-lg"
              style={{ borderRadius: '0.5rem' }}
              onClick={(e) => {
                e.preventDefault();
                onClick(`${index + 1}`);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage == pages ? (
          <></>
        ) : (
          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              onClick("next");
            }}
          >
            <PaginationNext
              href="#"
              className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg"
              style={{ borderRadius: '0.5rem' }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
