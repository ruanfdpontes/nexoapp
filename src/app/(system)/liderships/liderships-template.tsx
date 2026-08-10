"use client";

import "./liderships-template.css";
import { useState } from "react";
import LidershipFormModal from "./modal/liderships-form-modal";

type Lideranca = {
  id: number;
  nome: string;
  bairro: string;
  endereco: string;
  telefone: string;
};

const liderancasExemplo: Lideranca[] = [
  {
    id: 1,
    nome: "Maria da Silva",
    bairro: "Parquelândia",
    endereco: "Rua das Flores, 120",
    telefone: "(85) 99999-1111",
  },
  {
    id: 2,
    nome: "João Pereira",
    bairro: "São Gerardo",
    endereco: "Av. Bezerra de Menezes, 850",
    telefone: "(85) 98888-2222",
  },
  {
    id: 3,
    nome: "Ana Souza",
    bairro: "Monte Castelo",
    endereco: "Rua Padre Cícero, 45",
    telefone: "(85) 97777-3333",
  },
];

export default function LidershipsTemplate() {
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const liderancasFiltradas = liderancasExemplo.filter((lideranca) => {
    const termo = busca.toLowerCase().trim();

    if (!termo) {
      return true;
    }

    return (
      lideranca.nome.toLowerCase().includes(termo) ||
      lideranca.bairro.toLowerCase().includes(termo) ||
      lideranca.endereco.toLowerCase().includes(termo) ||
      lideranca.telefone.toLowerCase().includes(termo)
    );
  });

  function adicionarLideranca() {
    setModalOpen(true)
  }

  return (
    <div className="liderships-page">
      <div className="liderships-container">

        <header className="liderships-header">
          <div>
            <h1>Lideranças</h1>
            <p>
              Consulte e gerencie as lideranças cadastradas.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={adicionarLideranca}
          >
            + Adicionar liderança
          </button>
        </header>

        <section className="liderships-search">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, bairro, endereço ou telefone..."
            />

            {busca && (
              <button
                className="clear-search"
                onClick={() => setBusca("")}
                type="button"
              >
                ×
              </button>
            )}
          </div>
        </section>

        <section className="liderships-list">
          <div className="list-header">
            <span>
              {liderancasFiltradas.length}{" "}
              {liderancasFiltradas.length === 1
                ? "liderança encontrada"
                : "lideranças encontradas"}
            </span>
          </div>

          {liderancasFiltradas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>

              <h3>Nenhuma liderança encontrada</h3>

              <p>
                Tente buscar por outro nome, bairro, endereço ou telefone.
              </p>
            </div>
          ) : (
            <div className="liderancas-grid">
              {liderancasFiltradas.map((lideranca) => (
                <article
                  key={lideranca.id}
                  className="lideranca-card"
                >
                  <div className="lideranca-card-header">
                    <div className="lideranca-avatar">
                      {lideranca.nome.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h2>{lideranca.nome}</h2>
                      <span>{lideranca.bairro}</span>
                    </div>
                  </div>

                  <div className="lideranca-info">
                    <div>
                      <span className="info-label">Endereço</span>
                      <p>{lideranca.endereco}</p>
                    </div>

                    <div>
                      <span className="info-label">Telefone</span>
                      <p>{lideranca.telefone}</p>
                    </div>
                  </div>

                  <button className="view-lidership">
                    Ver liderança
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
        <LidershipFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}