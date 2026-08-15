"use client";

import Visit from "@/app/interfaces/visit.interface";
import { Eye } from "lucide-react";

interface VisitCardProps {
  visit: Visit;
}

export default function VisitCard({
  visit,
}: VisitCardProps) {
  return (
    <article className="visit-card">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="visit-card-header">
        <div className="visit-card-title">
          <h2>{visit.title}</h2>
          <div className="visit-card-leadership">
            <span>Liderança</span>

            <strong className="leadership-name">
              {visit.leadership_name ||
                "Não informada"}
            </strong>

            <span className="leadership-region">
              {visit.leadership_region}
            </span>

            <span className="leadership-neighborhood">
              {visit.leadership_neighborhood}
            </span>
          </div>
        </div>

        <span
          className={`visit-status ${
            visit.visited
              ? "completed"
              : "pending"
          }`}
        >
          {visit.visited
            ? "Realizada"
            : "Pendente"}
        </span>
      </div>
      <br/>

      {/* =========================================
          INFORMAÇÕES
      ========================================= */}

      <div className="visit-info">

        {/* DATA */}
        <div className="visit-info-item">
          <span className="info-label">
            Data e hora
          </span>

          <p>
            {visit.visit_date
              ? `${new Date(
                  visit.visit_date
                ).toLocaleDateString("pt-BR")} ${new Date(
                  visit.visit_date
                ).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Não informada"}
          </p>
        </div>

        {/* ENDEREÇO */}
        <div className="visit-info-item">
          <span className="info-label">
            Local
          </span>

          <div className="visit-card-location">

            <strong>
              {visit.address_street
                ? `${visit.address_street}${
                    visit.address_number
                      ? `, ${visit.address_number}`
                      : ""
                  }`
                : "Não informado"}
            </strong>

            {visit.address_complement && (
              <small>
                {visit.address_complement}
              </small>
            )}

            {visit.address_neighborhood && (
              <span>
                {visit.address_neighborhood}
              </span>
            )}

            {visit.address_city && (
              <span>
                {visit.address_city}

                {visit.address_state
                  ? ` - ${visit.address_state}`
                  : ""}
              </span>
            )}

          </div>
        </div>

      </div>
      <br/>
      {/* =========================================
          DETALHE
      ========================================= */}

      <button
        type="button"
        className="btn btn-full btn-secondary"
      >
        <Eye size={20} />
        Detalhe
      </button>

    </article>
  );
}