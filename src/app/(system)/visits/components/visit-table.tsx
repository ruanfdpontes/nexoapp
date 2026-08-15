"use client";

import Visit from "@/app/interfaces/visit.interface";
import { Eye } from "lucide-react";

interface VisitTableProps {
  visits: Visit[];
}

export default function VisitTable({
  visits,
}: VisitTableProps) {
  return (
    <table className="visit-table stripped">

      <thead>
        <tr>
          <th>Visita</th>
          <th>Liderança</th>
          <th>Data</th>
          <th>Local</th>
          <th className="text-center">Status</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>

      <tbody>
        {visits.map((visit) => (
          <tr key={visit.id}>

            {/* =====================================
                VISITA
            ===================================== */}

            <td>
              <div className="visit-table-title">
                <strong>
                  {visit.title}
                </strong>
              </div>
            </td>

            {/* =====================================
                LIDERANÇA
            ===================================== */}

            <td>
                <div className="visit-table-leadership">
                    <strong>
                    {visit.leadership_name ||
                        "Não informado"}
                    </strong>

                    <span>
                        {visit.leadership_region || ""}
                    </span>

                    <small>
                        {visit.leadership_neighborhood || ""}
                    </small>
                </div>
            </td>

            {/* =====================================
                DATA
            ===================================== */}

            <td>
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
            </td>
            {/* =====================================
                LOCAL
            ===================================== */}

            <td>
                <div className="visit-table-location">
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

                    {(visit.address_neighborhood ||
                    visit.address_city) && (
                    <span>
                        {visit.address_neighborhood || ""}

                        {visit.address_neighborhood &&
                        visit.address_city
                        ? " - "
                        : ""}

                        {visit.address_city || ""}

                        {visit.address_state
                        ? ` - ${visit.address_state}`
                        : ""}
                    </span>
                    )}
                </div>
            </td>

            {/* =====================================
                STATUS
            ===================================== */}

            <td className="text-center">
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
            </td>

            {/* =====================================
                AÇÕES
            ===================================== */}

            <td className="text-center">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
              >
                <Eye size={16} />
                Detalhe
              </button>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}