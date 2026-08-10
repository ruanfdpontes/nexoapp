"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import "./data-list.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Pagination from "../pagination";

interface DataListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderTable?: (items: T[]) => ReactNode;

  itemsPerPage: number;

  onItemsPerPageChange: (value: number) => void;

  emptyMessage?: string;
  emptyDescription?: string;
}

export default function DataList<T>({
  items,
  renderItem,
  renderTable,
  itemsPerPage = 6,
  onItemsPerPageChange,
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={goToPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
      <br/>
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