"use client";

import {
  Form,
  FormActions,
  FormField,
} from "@/app/components/form";


import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import BrazilianStates from "@/utils/brazilian-states";

import CepField from "@/app/components/form/cep-field";
import { getAddressByZipCode } from "@/app/services/zip-code.service";

import { UseLeaderships } from "@/app/hooks/use-leaderships";

import "./index.css";
import Visit from "@/app/interfaces/visit.interface";
import Leadership from "@/app/interfaces/leadership.interface";

interface VisitFormPartialProps {
  visit?: Visit | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function VisitFormPartial({
  visit = null,
  onCancel,
  onSuccess,
}: VisitFormPartialProps) {
  // =========================================
  // DADOS DA VISITA
  // =========================================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [leadershipId, setLeadershipId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visited, setVisited] = useState(false);

  // =========================================
  // ENDEREÇO
  // =========================================

  const [addressZipCode, setAddressZipCode] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");

  const [loading, setLoading] = useState(false);

  const isEditing = !!visit;

  // =========================================
  // LIDERANÇAS
  // =========================================

  const {
    leaderships,
    loading: leadershipsLoading,
  } = UseLeaderships();

  // =========================================
  // BUSCAR CEP
  // =========================================

  const searchZipCode = async (zipCode: string) => {
    try {
      const data = await getAddressByZipCode(zipCode);

      setAddressStreet(data.logradouro || "");
      setAddressNeighborhood(data.bairro || "");
      setAddressCity(data.localidade || "");
      setAddressState(data.uf || "");
    } catch (error) {
      console.error(error);
    }
  };

  // =========================================
  // CARREGAR DADOS PARA EDIÇÃO
  // =========================================

  useEffect(() => {
    if (visit) {
      setTitle(visit.title ?? "");
      setDescription(visit.description ?? "");

      setLeadershipId(
        visit.leadership_id
          ? visit.leadership_id.toString()
          : ""
      );

      setVisitDate(
        visit.visit_date
          ? visit.visit_date.split("T")[0]
          : ""
      );

      setVisited(visit.visited ?? false);

      setAddressZipCode(
        visit.address_zip_code ?? ""
      );

      setAddressStreet(
        visit.address_street ?? ""
      );

      setAddressNumber(
        visit.address_number ?? ""
      );

      setAddressComplement(
        visit.address_complement ?? ""
      );

      setAddressNeighborhood(
        visit.address_neighborhood ?? ""
      );

      setAddressCity(
        visit.address_city ?? ""
      );

      setAddressState(
        visit.address_state ?? ""
      );
    } else {
      setTitle("");
      setDescription("");
      setLeadershipId("");
      setVisitDate("");
      setVisited(false);

      setAddressZipCode("");
      setAddressStreet("");
      setAddressNumber("");
      setAddressComplement("");
      setAddressNeighborhood("");
      setAddressCity("");
      setAddressState("");
    }
  }, [visit]);

  // =========================================
  // SALVAR
  // =========================================

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        isEditing
          ? `/api/visits/${visit?.id}`
          : "/api/visits",
        {
          method: isEditing ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            leadership_id: Number(
              leadershipId
            ),

            title,
            description,

            visit_date: visitDate || null,

            visited,

            address_cep: addressZipCode,
            address_street: addressStreet,
            address_number: addressNumber,
            address_complement: addressComplement,
            address_neighborhood:
              addressNeighborhood,
            address_city: addressCity,
            address_state: addressState,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error ||
            "Não foi possível salvar a visita."
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao salvar visita."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // CEP PREENCHIDO
  // =========================================

  const zipCodeFilled =
    addressZipCode.replace(/\D/g, "").length === 8;

  // =========================================
  // FORMULÁRIO
  // =========================================

  return (
    <Form onSubmit={handleSubmit}>

      {/* =========================================
          DADOS DA VISITA
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Dados da visita</h3>

          <p>
            Informações básicas da visita
          </p>
        </div>

        <div className="form-card-body">

          {/* LIDERANÇA */}

          <div className="form-field">
            <label htmlFor="leadership_id">
              Liderança
              <span className="form-required">
                *
              </span>
            </label>

            <select
              id="leadership_id"
              name="leadership_id"
              value={leadershipId}
              onChange={(event) =>
                setLeadershipId(
                  event.target.value
                )
              }
              disabled={
                loading ||
                leadershipsLoading
              }
              required
              className={
                !leadershipId
                  ? "select-placeholder"
                  : ""
              }
            >
              <option value="">
                {leadershipsLoading
                  ? "Carregando lideranças..."
                  : "Selecione a liderança"}
              </option>

              {leaderships.map(
                (leadership: Leadership) => (
                  <option
                    key={leadership.id}
                    value={leadership.id}
                  >
                    {leadership.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* TÍTULO */}

          <FormField
            label="Título"
            name="title"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Título da visita"
            required
            disabled={loading}
          />

          {/* DATA */}

          <FormField
            label="Data da visita"
            name="visit_date"
            type="datetime-local"
            value={visitDate}
            onChange={(event) =>
              setVisitDate(
                event.target.value
              )
            }
            required
            disabled={loading}
            lang="pt-BR"
          />

          {/* DESCRIÇÃO */}

          <div className="form-field">
            <label htmlFor="description">
              Descrição
            </label>

            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Descreva os objetivos ou informações da visita..."
              disabled={loading}
              rows={4}
            />
          </div>

        </div>
      </section>

      {/* =========================================
          ENDEREÇO
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Endereço da visita</h3>

          <p>
            Local onde a visita será realizada
          </p>
        </div>

        <div className="form-card-body">

          {/* CEP */}

          <CepField
            label="CEP"
            name="address_zip_code"
            value={addressZipCode}
            onChange={(value) => {
              setAddressZipCode(value);

              const cleanZipCode =
                value.replace(/\D/g, "");

              if (
                cleanZipCode.length === 8
              ) {
                searchZipCode(cleanZipCode);
              }
            }}
            disabled={loading}
          />

          {/* LOGRADOURO */}

          <FormField
            label="Logradouro"
            name="address_street"
            value={addressStreet}
            onChange={(event) =>
              setAddressStreet(
                event.target.value
              )
            }
            placeholder="Rua, avenida, estrada, praça..."
            autoComplete="street-address"
            required
            disabled={
              loading || !zipCodeFilled
            }
          />

          {/* NÚMERO */}

          <FormField
            label="Número"
            name="address_number"
            value={addressNumber}
            onChange={(event) =>
              setAddressNumber(
                event.target.value
              )
            }
            placeholder="Número"
            required
            disabled={
              loading || !zipCodeFilled
            }
          />

          {/* COMPLEMENTO */}

          <FormField
            label="Complemento"
            name="address_complement"
            value={addressComplement}
            onChange={(event) =>
              setAddressComplement(
                event.target.value
              )
            }
            placeholder="Apartamento, bloco, casa etc."
            disabled={
              loading || !zipCodeFilled
            }
          />

          {/* BAIRRO */}

          <FormField
            label="Bairro"
            name="address_neighborhood"
            value={addressNeighborhood}
            onChange={(event) =>
              setAddressNeighborhood(
                event.target.value
              )
            }
            placeholder="Bairro"
            autoComplete="address-level3"
            required
            disabled={
              loading || !zipCodeFilled
            }
          />

          {/* CIDADE */}

          <FormField
            label="Cidade"
            name="address_city"
            value={addressCity}
            onChange={(event) =>
              setAddressCity(
                event.target.value
              )
            }
            placeholder="Cidade"
            autoComplete="address-level2"
            required
            disabled={
              loading || !zipCodeFilled
            }
          />

          {/* ESTADO */}

          <div className="form-field">
            <label htmlFor="address_state">
              Estado (UF)

              <span className="form-required">
                *
              </span>
            </label>

            <select
              id="address_state"
              name="address_state"
              value={addressState}
              onChange={(event) =>
                setAddressState(
                  event.target.value
                )
              }
              disabled={
                loading || !zipCodeFilled
              }
              required
              className={
                !addressState
                  ? "select-placeholder"
                  : ""
              }
            >
              <option value="">
                Estado
              </option>

              {BrazilianStates.map(
                (state) => (
                  <option
                    key={state.value}
                    value={state.value}
                  >
                    {state.label} (
                    {state.value})
                  </option>
                )
              )}
            </select>
          </div>

        </div>
      </section>

      {/* =========================================
          STATUS
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Status da visita</h3>

          <p>
            Informe se a visita já foi realizada
          </p>
        </div>

        <div className="form-card-body">

          <div className="form-field">
            <label htmlFor="visited">
              Situação
            </label>

            <select
              id="visited"
              name="visited"
              value={
                visited
                  ? "true"
                  : "false"
              }
              onChange={(event) =>
                setVisited(
                  event.target.value ===
                    "true"
                )
              }
              disabled={loading}
            >
              <option value="false">
                Pendente
              </option>

              <option value="true">
                Realizada
              </option>
            </select>
          </div>

        </div>
      </section>

      {/* =========================================
          AÇÕES
      ========================================= */}

      <FormActions
        onCancel={onCancel}
        loading={loading}
        submitText={
          isEditing
            ? "Salvar alterações"
            : "Adicionar visita"
        }
        loadingText="Salvando..."
      />

    </Form>
  );
}