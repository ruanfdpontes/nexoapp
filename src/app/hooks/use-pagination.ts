"use client";

import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export function UsePagination<T>({
  items,
  itemsPerPage = 10,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    items.length / itemsPerPage
  );

  const paginatedItems = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;

    return items.slice(
      start,
      start + itemsPerPage
    );
  }, [items, currentPage, itemsPerPage]);

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }

  function previousPage() {
    goToPage(currentPage - 1);
  }

  function resetPage() {
    setCurrentPage(1);
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
  };
}