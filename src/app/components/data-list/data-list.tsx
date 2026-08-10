"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import "./data-list.css";

interface DataListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderTable?: (items: T[]) => ReactNode;

  itemsPerPage?: number;

  emptyMessage?: string;
  emptyDescription?: string;
}

export default function DataList<T>({
  items,
  renderItem,
  renderTable,
  itemsPerPage = 10,
  emptyMessage = "Nenhum registro encontrado",
  emptyDescription,
}: DataListProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileItems, setMobileItems] =
    useState(itemsPerPage);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(
    items.length / itemsPerPage
  );

  const desktopItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const mobileList = items.slice(
    0,
    mobileItems
  );

  const hasMoreMobile =
    mobileItems < items.length;

  // =========================================
  // RESET
  // =========================================

  useEffect(() => {
    setCurrentPage(1);
    setMobileItems(itemsPerPage);
  }, [items, itemsPerPage]);

  // =========================================
  // INFINITE SCROLL MOBILE
  // =========================================

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            !entry.isIntersecting ||
            !hasMoreMobile ||
            window.innerWidth > 700
          ) {
            return;
          }

          setMobileItems((current) =>
            Math.min(
              current + itemsPerPage,
              items.length
            )
          );
        },
        {
          rootMargin: "300px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    hasMoreMobile,
    items.length,
    itemsPerPage,
    mobileItems,
  ]);

  // =========================================
  // PAGINAÇÃO DESKTOP
  // =========================================

  function goToPage(page: number) {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================
  // VAZIO
  // =========================================

  if (items.length === 0) {
    return (
      <div className="data-list-empty">
        <div className="data-list-empty-icon">
          ⌕
        </div>

        <h3>{emptyMessage}</h3>

        {emptyDescription && (
          <p>{emptyDescription}</p>
        )}
      </div>
    );
  }

  return (
    <div className="data-list">

      {/* =====================================
          DESKTOP
      ===================================== */}

      <div className="data-list-desktop">

        <div className="data-list-table-wrapper">
          {renderTable ? (
            renderTable(desktopItems)
          ) : (
            <table className="data-list-table">
              <tbody>
                {desktopItems.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>
                        {renderItem(item)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="data-list-pagination">

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() =>
                goToPage(
                  currentPage - 1
                )
              }
            >
              ← Anterior
            </button>

            <div className="data-list-pages">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    page === currentPage
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    goToPage(page)
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                goToPage(
                  currentPage + 1
                )
              }
            >
              Próxima →
            </button>

          </div>
        )}

      </div>

      {/* =====================================
          MOBILE
      ===================================== */}

      <div className="data-list-mobile">

        <div className="data-list-items">

          {mobileList.map(
            (item, index) => (
              <div
                className="data-list-item"
                key={index}
              >
                {renderItem(item)}
              </div>
            )
          )}

        </div>

        {/* SENSOR DO INFINITE SCROLL */}

        {hasMoreMobile && (
          <div
            ref={loadMoreRef}
            className="data-list-loading"
            aria-hidden="true"
          />
        )}

      </div>

    </div>
  );
}