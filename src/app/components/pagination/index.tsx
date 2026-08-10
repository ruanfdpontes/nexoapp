import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import "./index.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;

  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;

  onPageChange: (page: number) => void;
}

function getPaginationPages(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 5) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  if (currentPage <= 3) {
    return [
      1,
      2,
      3,
      4,
      "...",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onItemsPerPageChange,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="pagination">

      {/* ITENS POR PÁGINA */}

      <div className="pagination-per-page">
        <span>Exibir</span>

        <select
          value={itemsPerPage}
          onChange={(event) =>
            onItemsPerPageChange(
              Number(event.target.value)
            )
          }
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>

        <span>por página</span>
      </div>

      {/* NAVEGAÇÃO */}

      <div className="pagination-navigation">

        {/* PRIMEIRA PÁGINA */}

        <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="Primeira página"
        >
            <ChevronsLeft size={18} />
        </button>


        {/* PÁGINA ANTERIOR */}

        <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
            onPageChange(currentPage - 1)
            }
            aria-label="Página anterior"
        >
            <ArrowLeft size={18} />
        </button>


        {/* PÁGINAS */}

        <div className="pagination-pages">

            {getPaginationPages(
            currentPage,
            totalPages
            ).map((page, index) => {

            if (page === "...") {
                return (
                <span
                    key={`ellipsis-${index}`}
                    className="pagination-ellipsis"
                >
                    ...
                </span>
                );
            }

            return (
                <button
                type="button"
                key={page}
                className={
                    page === currentPage
                    ? "active"
                    : ""
                }
                onClick={() =>
                    onPageChange(page)
                }
                >
                {page}
                </button>
            );
            })}

        </div>


        {/* PRÓXIMA PÁGINA */}

        <button
            type="button"
            disabled={
            currentPage === totalPages
            }
            onClick={() =>
            onPageChange(currentPage + 1)
            }
            aria-label="Próxima página"
        >
            <ArrowRight size={18} />
        </button>


        {/* ÚLTIMA PÁGINA */}

        <button
            type="button"
            disabled={
            currentPage === totalPages
            }
            onClick={() =>
            onPageChange(totalPages)
            }
            aria-label="Última página"
        >
            <ChevronsRight size={18} />
        </button>

        </div>

    </div>
  );
}