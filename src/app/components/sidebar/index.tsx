"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "./index.css";
import Image from "next/image";
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
        <Menu size={24} />
      </button>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

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

          {/* Controle desktop */}
          <button
            type="button"
            className="sidebar-collapse-button"
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

          {/* Controle mobile */}
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
            onClick={() => navigate("/liderships")}
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
    </>
  );
}