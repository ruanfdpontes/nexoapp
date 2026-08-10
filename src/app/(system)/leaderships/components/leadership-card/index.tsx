"use client";

import { Leadership } from "@/app/interfaces/leadership.interface";
import { Eye } from "lucide-react";

interface LeadershipCardProps {
  leadership: Leadership;
}

export default function LeadershipCard({
  leadership,
}: LeadershipCardProps) {
  return (
    <article className="leadership-card">

      <div className="leadership-card-header">

        <div className="leadership-avatar">
          {leadership.name
            .charAt(0)
            .toUpperCase()}
        </div>

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

      </div>
      <br/>
      <button
        type="button"
        className="btn btn-full btn-secondary"
      >
        <Eye size={30} /> Detalhe
      </button>
    </article>
  );
}