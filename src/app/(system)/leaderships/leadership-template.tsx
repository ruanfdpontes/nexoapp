"use client";

import "./leadership-template.css";

import { useMemo, useState } from "react";

import LeadershipFormModal from "./modals/leadership-form-modal";
import { Leadership } from "@/app/interfaces/leadership.interface";
import { UseLeaderships } from "@/app/hooks/use-leaderships";

import SearchInput from "@/app/components/search-input";
import DataList from "@/app/components/data-list/data-list";

import LeadershipCard from "./components/leadership-card";
import LeadershipTable from "./components/leadership-table";

export default function LeadershipTemplate() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    leaderships,
    loading,
    error,
    loadLeaderships,
  } = UseLeaderships();

  // =========================================
  // FILTRO
  // =========================================

  const leadershipsFiltered = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) {
      return leaderships;
    }

    return leaderships.filter((leadership) => {
      return (
        leadership.name
          .toLowerCase()
          .includes(term) ||

        leadership.region
          ?.toLowerCase()
          .includes(term) ||

        leadership.address_neighborhood
          ?.toLowerCase()
          .includes(term) ||

        leadership.address_street
          ?.toLowerCase()
          .includes(term) ||

        leadership.mobile_number
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [leaderships, search]);

  // =========================================
  // SUCESSO
  // =========================================

  async function handleSuccess() {
    setModalOpen(false);
    await loadLeaderships();
  }

  // =========================================
  // ADICIONAR
  // =========================================

  function addLeadership() {
    setModalOpen(true);
  }

  return (
    <div className="leaderships-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="leaderships-header">
        <div>
          <h1>Lideranças</h1>

          <p>
            Consulte e gerencie as lideranças cadastradas.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={addLeadership}
        >
          + Adicionar liderança
        </button>
      </header>

      {/* =========================================
          BUSCA
      ========================================= */}

      <section className="leaderships-search">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por nome, regional, bairro, endereço ou telefone..."
        />
      </section>

      {/* =========================================
          LISTA
      ========================================= */}

      <section>
        <div className="list-header">
          <span>
            {leadershipsFiltered.length}{" "}
            {leadershipsFiltered.length === 1
              ? "liderança encontrada"
              : "lideranças encontradas"}
          </span>
        </div>

        {/* CARREGANDO */}

        {loading && leaderships.length === 0 ? (
          <div className="empty-state">
            <p>Carregando lideranças...</p>
          </div>

        ) : error ? (

          /* ERRO */

          <div className="empty-state">
            <h3>
              Não foi possível carregar as lideranças
            </h3>

            <p>{error}</p>

            <button
              type="button"
              className="add-leadership-button"
              onClick={loadLeaderships}
            >
              Tentar novamente
            </button>
          </div>

        ) : (

          /* LISTA */

          <DataList<Leadership>
            items={leadershipsFiltered}
            itemsPerPage={10}
            emptyMessage="Nenhuma liderança encontrada"
            emptyDescription="Tente buscar por outro nome, regional, bairro, endereço ou telefone."

            /* =====================================
                MOBILE
            ===================================== */

            renderItem={(leadership) => (
              <LeadershipCard
                leadership={leadership}
              />
            )}

            /* =====================================
                DESKTOP
            ===================================== */

            renderTable={(leaderships) => (
              <LeadershipTable
                leaderships={leaderships}
              />
            )}
          />
        )}
      </section>

      {/* =========================================
          MODAL
      ========================================= */}

      <LeadershipFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />

    </div>
  );
}