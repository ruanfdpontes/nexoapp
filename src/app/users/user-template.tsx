"use client";
import { FormEvent, useEffect, useState } from "react";
import "./user-template.css";
import User from "@/interfaces/user.interface"
import formatDate from "@/utils/formatDate";

export default function UserTemplate() {
  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function usersFetch() {
    try {
      const response = await fetch("/api/users");

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao carregar usuários.");
        return;
      }

      setUsers(data.users);
    } catch (error) {
      console.error(error);
      setError("Não foi possível carregar os usuários.");
    }
  }

  useEffect(() => {
    usersFetch();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao cadastrar usuário.");
        return;
      }

      setSuccess("Usuário cadastrado com sucesso.");

      setName("");
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");

      await usersFetch();
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao excluir usuário.");
        return;
      }

      setSuccess("Usuário excluído com sucesso.");

      await usersFetch();
    } catch (error) {
      console.error(error);
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }

  return (
    <main className="users-page">
      <div className="users-container">
        <header className="users-header">
          <div>
            <h1>Usuários</h1>
            <p>Cadastre e gerencie os usuários do sistema.</p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Sair
          </button>
        </header>

        <div className="users-content">
          {/* CADASTRO */}
          <section className="usuario-form-section">
            <h2>Novo usuário</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Digite o nome"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Usuário</label>

                <input
                  id="username"
                  type="text"
                  placeholder="Digite o usuário"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">E-mail</label>

                <input
                  id="email"
                  type="text"
                  placeholder="Digite o e-mail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Senha</label>

                <input
                  id="password"
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirmação de Senha</label>

                <input
                  id="passwordConfirmation"
                  type="password"
                  placeholder="Digite a confirmação de senha"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  required
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              {success && (
                <div className="form-success">{success}</div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={
                  loading || 
                  name === '' || 
                  username === '' || 
                  email === '' || 
                  password === '' || 
                  password.length < 8 || 
                  password !== passwordConfirmation
                }
              >
                {loading ? "Cadastrando..." : "Cadastrar usuário"}
              </button>
            </form>
          </section>

          {/* LISTAGEM */}
          <section className="users-list-section">
            <div className="list-header">
              <h2>Usuários cadastrados</h2>

              <span>{users?.length}</span>
            </div>

            {users?.length === 0 ? (
              <p className="empty-message">
                Nenhum usuário cadastrado.
              </p>
            ) : (
              <div className="users-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Usuário</th>
                      <th>Email</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button className="btn btn-primary btn-sm" onClick={() => handleDelete(user.id)}>Excluir</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}