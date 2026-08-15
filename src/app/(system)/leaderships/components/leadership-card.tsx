"use client";

import Leadership from "@/app/interfaces/leadership.interface";
import FormatPhone from "@/utils/format-phone";
import { CalendarDays, Eye } from "lucide-react";

interface LeadershipCardProps {
  leadership: Leadership;
}

export default function LeadershipCard({
  leadership,
}: LeadershipCardProps) {
  const hasPhone =
    !!leadership.phone_number ||
    !!leadership.mobile_number;

  return (
    <article className="leadership-card">

      <div className="leadership-card-header">
        <div>
          <h2>{leadership.name}</h2>
          <span>
            {leadership.region ||
              "Regional não informada"}
          </span>
        </div>
      </div>
      <div className="leadership-info">

        <div>
          <span className="info-label">
            Bairro
          </span>

          <p>
            {leadership.address_neighborhood ||
              "Não informado"}
          </p>
        </div>

        <div>
          <span className="info-label">
            Projeção de votos
          </span>

          <p>
            {Number(
              leadership.votes_projection || 0
            ).toLocaleString("pt-BR")}
          </p>
        </div>
        <div>
          <span className="info-label">
            Telefone
          </span>

          <div className="leadership-phones">
            {hasPhone ? (
              <>
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
              </>
            ) : (
              <span>Não informado</span>
            )}
          </div>
        </div>
      </div>
      
      <br/>
      <div className="leadership-card-actions">
        <button
          type="button"
          className="btn btn-secondary"
          title="Ver visitas"
          aria-label="Ver visitas"
        >
          <CalendarDays size={30} />
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          title="Ver detalhes"
          aria-label="Ver detalhes"
        >
          <Eye size={30} />
        </button>
      </div>
    </article>
  );
}