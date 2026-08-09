"use client";

import { FormEvent, useState } from "react";
import "./login-template.css";
import { Eye, EyeClosed, LogIn } from "lucide-react";
import Logo from "../components/logo";

export default function LoginTemplate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logged, setLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setLogged(true);
      if (data.user.admin === true) {
        window.location.href = "/users";
        return;
      }

      window.location.href = "/dashboard";
    } catch (error) {
      setError("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Logo size="large" />
          <br/>
          <h1>Nexo</h1>

          <p>Sistema de Liderença</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário ou E-mail</label>

            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário ou e-mail"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value.toLocaleLowerCase())}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeClosed className="icon" size={20} />
                ) : (
                  <Eye className="icon" size={20} />
                )}
              </button>
            </div>            
          </div>
          
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {logged && (
            <div className="login-success">
              Login efetuado com sucesso!
            </div>
          )}

          <button type="submit" className="btn btn-full btn-primary">
            <div className="login-btn">
              Entrar
              <LogIn className="icon" size={20} />
            </div>
          </button>
        </form>
      </div>
    </main>
  );
}