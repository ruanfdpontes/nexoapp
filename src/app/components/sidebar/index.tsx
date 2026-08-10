"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import "./index.css";
import Logo from "../logo";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  function navigate(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${
          open ? "sidebar-open" : ""
        } ${
          collapsed ? "sidebar-collapsed" : ""
        }`}
      >
        {/* HEADER */}
        <div className="sidebar-header">

          <div className="sidebar-logo">
            <Logo size="small" />

            <span className="sidebar-title">
              <b>Nexo</b>
              <p>Sistema de Lideranças</p>
            </span>
          </div>

          {/* CONTROLE MOBILE */}
          <button
            type="button"
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* MENU */}
        <nav className="sidebar-menu">

          <button
            type="button"
            className="menu-item"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard
              className="menu-icon"
              size={20}
            />

            <span className="menu-label">
              Dashboard
            </span>
          </button>

          <button
            type="button"
            className="menu-item"
            onClick={() => navigate("/leaderships")}
          >
            <Users
              className="menu-icon"
              size={20}
            />

            <span className="menu-label">
              Lideranças
            </span>
          </button>

        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">

          <button
            type="button"
            className="menu-item logout-button"
            onClick={handleLogout}
          >
            <LogOut
              className="menu-icon"
              size={20}
            />

            <span className="menu-label">
              Sair
            </span>
          </button>

        </div>
      </aside>

      {/* BOTÃO DE COLLAPSE */}
      <button
        type="button"
        className={`sidebar-collapse-button ${
          collapsed
            ? "sidebar-collapse-button-collapsed"
            : ""
        }`}
        onClick={() => setCollapsed((value) => !value)}
        aria-label={
          collapsed
            ? "Expandir menu"
            : "Recolher menu"
        }
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        )}
      </button>
    </>
  );
}