"use client";

import "./visit-template.css";

import { useMemo, useState } from "react";

import { UseVisits } from "@/app/hooks/use-visits";

import SearchInput from "@/app/components/search-input";
import DataList from "@/app/components/data-list/data-list";

import VisitCard from "./components/visit-card";
import VisitTable from "./components/visit-table";
import Visit from "@/app/interfaces/visit.interface";
import VisitFormModal from "./modals/visit-form-modal";

export default function VisitTemplate() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const {
    visits,
    loading,
    error,
    loadVisits,
  } = UseVisits();

  // =========================================
  // FILTRO
  // =========================================

  const visitsFiltered = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) {
      return visits;
    }

    return visits.filter((visit) => {
      return (
        visit.title
          ?.toLowerCase()
          .includes(term) ||

        visit.description
          ?.toLowerCase()
          .includes(term) ||

        visit.address_neighborhood
          ?.toLowerCase()
          .includes(term) ||

        visit.address_street
          ?.toLowerCase()
          .includes(term) ||

        visit.address_city
          ?.toLowerCase()
          .includes(term) ||

        visit.address_state
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [visits, search]);

  // =========================================
  // SUCESSO
  // =========================================

  async function handleSuccess() {
    setModalOpen(false);
    await loadVisits();
  }

  // =========================================
  // ADICIONAR
  // =========================================

  function addVisit() {
    setModalOpen(true);
  }

  return (
    <div className="visits-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="visits-header">
        <div>
          <h1>Visitas</h1>

          <p>
            Consulte e gerencie as visitas cadastradas.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={addVisit}
        >
          + Adicionar visita
        </button>
      </header>

      {/* =========================================
          BUSCA
      ========================================= */}

      <section className="visits-search">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por título, endereço, bairro ou cidade..."
        />
      </section>

      {/* =========================================
          LISTA
      ========================================= */}

      <section>
        <div className="list-header">
          <span>
            {visitsFiltered.length}{" "}
            {visitsFiltered.length === 1
              ? "visita encontrada"
              : "visitas encontradas"}
          </span>
        </div>

        {/* CARREGANDO */}

        {loading && visits.length === 0 ? (
          <div className="empty-state">
            <p>Carregando visitas...</p>
          </div>

        ) : error ? (

          /* ERRO */

          <div className="empty-state">
            <h3>
              Não foi possível carregar as visitas
            </h3>

            <p>{error}</p>

            <button
              type="button"
              className="add-visit-button"
              onClick={loadVisits}
            >
              Tentar novamente
            </button>
          </div>

        ) : (

          /* LISTA */

          <DataList<Visit>
            items={visitsFiltered}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            emptyMessage="Nenhuma visita encontrada"
            emptyDescription="Tente buscar por outro título, endereço, bairro ou cidade."

            /* =====================================
                MOBILE
            ===================================== */

            renderItem={(visit) => (
              <VisitCard
                visit={visit}
              />
            )}

            /* =====================================
                DESKTOP
            ===================================== */

            renderTable={(visits) => (
              <VisitTable
                visits={visits}
              />
            )}
          />
        )}
      </section>

      {/* =========================================
          MODAL
      ========================================= */}

      <VisitFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />

    </div>
  );
}