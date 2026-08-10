"use client";

import { useEffect, useState } from "react";
import "./dashboard-template.css";
import User from "@/app/interfaces/user.interface";

export default function DashboardTemplate() {
  const [me, setMe] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
        console.error(
          "Erro ao carregar usuário:",
          error
        );
      } finally {
        setLoadingUser(false);
      }
    }

    loadMe();
  }, []);
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h3>
              {loadingUser
                ? "Olá..."
                : `Olá, ${me?.name ?? "usuário"}`}
            </h3>
            <p>Acompanhe suas atividades e visitas</p>
          </div>
        </header>
      </div>
    </div>
  );
}