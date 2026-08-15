"use client";

import { CalendarDays, Eye } from "lucide-react";
import FormatPhone from '@/utils/format-phone'
import Leadership from "@/app/interfaces/leadership.interface";

interface LeadershipTableProps {
  leaderships: Leadership[];
}

export default function LeadershipTable({
  leaderships,
}: LeadershipTableProps) {
  return (
    <table className="leadership-table stripped">

      <thead>
        <tr>
          <th>Nome</th>
          <th>Regional</th>
          <th>Bairro</th>
          <th className="text-center">Contato</th>
          <th className="text-right">Projeção de votos</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>

      <tbody>
        {leaderships.map((leadership) => (
          <tr key={leadership.id}>

            <td>
              <div className="leadership-table-name">
                <strong>
                  {leadership.name}
                </strong>
              </div>
            </td>

            <td>
              {leadership.region ||
                "Não informado"}
            </td>

            <td>
              {leadership.address_neighborhood ||
                "Não informado"}
            </td>

            <td className="text-center">
              {leadership.phone_number ||
              leadership.mobile_number ? (
                <div className="leadership-phones">
                  {leadership.mobile_number && (
                    <span>
                      {FormatPhone(
                        leadership.mobile_number
                      )}
                    </span>
                  )}

                  {leadership.phone_number && (
                    <span>
                      {FormatPhone(
                        leadership.phone_number
                      )}
                    </span>
                  )}
                </div>
              ) : (
                "Não informado"
              )}
            </td>

            <td className="text-right">
              {Number(
                leadership.votes_projection || 0
              ).toLocaleString("pt-BR")}
            </td>

            <td className="text-center">
              <div className="table-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  title="Ver visitas"
                  aria-label="Ver visitas"
                >
                  <CalendarDays size={16} />
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  title="Ver detalhes"
                  aria-label="Ver detalhes"
                >
                  <Eye size={16} />
                </button>
              </div>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}