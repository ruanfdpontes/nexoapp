"use client";

import { useEffect, useState } from "react";
import "./dashboard-template.css";

type User = {
  name: string;
  username: string;
  email: string
  admin: boolean;
};

export default function DashboardTemplate() {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/me");

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        setMe(data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }

    loadMe();
  }, []);
  
  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h3>
              Olá, {me?.name ?? "usuário"}
            </h3>
            <p>Acompanhe suas atividades e visitas</p>
          </div>
        </header>
      </div>
    </main>
  );
}