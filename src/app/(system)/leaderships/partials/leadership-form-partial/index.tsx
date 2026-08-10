"use client";

import {
  Form,
  FormActions,
  FormField,
} from "@/app/components/form";
import { Leadership } from "@/app/interfaces/leadership.interface";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import BrazilianStates from '@/utils/brazilian-states'
import './index.css'
import PhoneField from "@/app/components/form/phone-field";
import CepField from "@/app/components/form/cep-field";
import { getAddressByCep } from '@/app/services/cep.service';

interface LeadershipFormPartialProps {
  leadership?: Leadership | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function LeadershipFormPartial({
  leadership = null,
  onCancel,
  onSuccess,
}: LeadershipFormPartialProps) {
  // =========================================
  // DADOS DA LIDERANÇA
  // =========================================

  const [name, setName] = useState("");
  const [votesProjection, setVotesProjection] = useState("");
  const [region, setRegion] = useState("");

  // =========================================
  // CONTATO
  // =========================================

  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // =========================================
  // ENDEREÇO PRINCIPAL
  // =========================================

  const [addressCep, setAddressCep] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [addressNeighborhood, setAddressNeighborhood] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");

  // =========================================
  // DADOS ELEITORAIS
  // =========================================

  const [voterRegistrationNumber, setVoterRegistrationNumber] =
    useState("");

  const [voterZone, setVoterZone] = useState("");
  const [voterSection, setVoterSection] = useState("");
  const [voterCity, setVoterCity] = useState("");
  const [voterLocation, setVoterLocation] = useState("");

  const [loading, setLoading] = useState(false);

  const isEditing = !!leadership;

  const searchCep = async (cep: string) => {
    try {
      const data = await getAddressByCep(cep);

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
    if (leadership) {
      setName(leadership.name ?? "");
      setVotesProjection(
        leadership.votes_projection !== 0 ? 
          leadership.votes_projection.toString() : 
          ""
      );
      setRegion(leadership.region ?? "");

      setPhoneNumber(
        leadership.phone_number ?? ""
      );

      setMobileNumber(
        leadership.mobile_number ?? ""
      );

      setAddressCep(
        leadership.address_cep ?? ""
      );

      setAddressStreet(
        leadership.address_street ?? ""
      );

      setAddressNumber(
        leadership.address_number ?? ""
      );

      setAddressComplement(
        leadership.address_complement ?? ""
      );

      setAddressNeighborhood(
        leadership.address_neighborhood ?? ""
      );

      setAddressCity(
        leadership.address_city ?? ""
      );

      setAddressState(
        leadership.address_state ?? ""
      );

      setVoterRegistrationNumber(
        leadership.voter_registration_number ?? ""
      );

      setVoterZone(
        leadership.voter_zone ?? ""
      );

      setVoterSection(
        leadership.voter_section ?? ""
      );

      setVoterCity(
        leadership.voter_city ?? ""
      );

      setVoterLocation(
        leadership.voter_location ?? ""
      );
    } else {
      setName("");
      setVotesProjection("");
      setRegion("");

      setPhoneNumber("");
      setMobileNumber("");

      setAddressCep("");
      setAddressStreet("");
      setAddressNumber("");
      setAddressComplement("");
      setAddressNeighborhood("");
      setAddressCity("");
      setAddressState("");

      setVoterRegistrationNumber("");
      setVoterZone("");
      setVoterSection("");
      setVoterCity("");
      setVoterLocation("");
    }
  }, [leadership]);

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
          ? `/api/leaderships/${leadership?.id}`
          : "/api/leaderships",
        {
          method: isEditing ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            votes_projection: votesProjection,
            region,

            phone_number: phoneNumber,
            mobile_number: mobileNumber,

            address_cep: addressCep,
            address_street: addressStreet,
            address_number: addressNumber,
            address_complement: addressComplement,
            address_neighborhood: addressNeighborhood,
            address_city: addressCity,
            address_state: addressState,

            voter_registration_number:
              voterRegistrationNumber,
            voter_zone: voterZone,
            voter_section: voterSection,
            voter_city: voterCity,
            voter_location: voterLocation,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Não foi possível salvar a liderança."
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Erro ao criar liderança."
      );
    } finally {
      setLoading(false);
    }
  }

  const cepFilled =
    addressCep.replace(/\D/g, "").length === 8;

  // =========================================
  // FORMULÁRIO
  // =========================================

  return (
    <Form onSubmit={handleSubmit}>

      {/* =========================================
          DADOS DA LIDERANÇA
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Dados da liderança</h3>
          <p>Informações básicas</p>
        </div>

        <div className="form-card-body leadership-main-fields">
          <FormField
            label="Nome"
            name="name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Nome"
            required
            disabled={loading}
          />

          <FormField
            label="Regional"
            name="region"
            value={region}
            onChange={(event) =>
              setRegion(event.target.value)
            }
            placeholder="Regional"
            required
            disabled={loading}
          />

          <FormField
            label="Projeção de votos"
            name="votes_projection"
            type="text"
            value={votesProjection}
            onChange={(event) => {
              const value = event.target.value;

              if (/^\d*$/.test(value)) {
                setVotesProjection(value);
              }
            }}
            placeholder="0"
            required
            disabled={loading}
          />
        </div>
      </section>

      {/* =========================================
          CONTATO
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Contato</h3>
          <p>Telefones para contato</p>
        </div>

        <div className="form-card-body">
          <PhoneField
            label="Telefone"
            name="phone_number"
            type="landline"
            value={phoneNumber}
            onChange={setPhoneNumber}
            disabled={loading}
          />

          <PhoneField
            label="Celular"
            name="mobile_number"
            type="mobile"
            value={mobileNumber}
            onChange={setMobileNumber}
            disabled={loading}
          />
        </div>
      </section>

      {/* =========================================
          ENDEREÇO PRINCIPAL
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Endereço principal</h3>
          <p>Endereço residencial ou de referência</p>
        </div>

        <div className="form-card-body">
          <CepField
            label="CEP"
            name="address_cep"
            value={addressCep}
            onChange={(value) => {
              setAddressCep(value);

              const cleanCep = value.replace(/\D/g, "");

              if (cleanCep.length === 8) {
                searchCep(cleanCep);
              }
            }}
            disabled={loading}
          />

          <FormField
            label="Logradouro"
            name="address_street"
            value={addressStreet}
            onChange={(event) =>
              setAddressStreet(event.target.value)
            }
            placeholder="Rua, avenida, estrada, praça..."
            autoComplete="street-address"
            required
            disabled={loading || !cepFilled}
          />

          <FormField
            label="Número"
            name="address_number"
            value={addressNumber}
            onChange={(event) =>
              setAddressNumber(event.target.value)
            }
            placeholder="Número"
            required
            disabled={loading || !cepFilled}
          />

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
            disabled={loading || !cepFilled}
          />

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
            disabled={loading || !cepFilled}
          />

          <FormField
            label="Cidade"
            name="address_city"
            value={addressCity}
            onChange={(event) =>
              setAddressCity(event.target.value)
            }
            placeholder="Cidade"
            autoComplete="address-level2"
            required
            disabled={loading || !cepFilled}
          />

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
              disabled={loading || !cepFilled}
              required
              className={!addressState ? "select-placeholder" : ""}
            >
              <option value="">
                Estado
              </option>

              {BrazilianStates.map((state) => (
                <option
                  key={state.value}
                  value={state.value}
                >
                  {state.label} ({state.value})
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* =========================================
          DADOS ELEITORAIS
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Dados eleitorais</h3>
          <p>Informações do cadastro eleitoral</p>
        </div>

        <div className="form-card-body">

          <FormField
            label="Título de eleitor"
            name="voter_registration_number"
            value={voterRegistrationNumber}
            onChange={(event) =>
              setVoterRegistrationNumber(
                event.target.value
              )
            }
            placeholder="Número do título de eleitor"
            disabled={loading}
          />

          <FormField
            label="Zona eleitoral"
            name="voter_zone"
            value={voterZone}
            onChange={(event) =>
              setVoterZone(event.target.value)
            }
            placeholder="Número da zona"
            disabled={loading}
          />

          <FormField
            label="Seção eleitoral"
            name="voter_section"
            value={voterSection}
            onChange={(event) =>
              setVoterSection(
                event.target.value
              )
            }
            placeholder="Número da seção"
            disabled={loading}
          />

          <FormField
            label="Cidade eleitoral"
            name="voter_city"
            value={voterCity}
            onChange={(event) =>
              setVoterCity(event.target.value)
            }
            placeholder="Cidade do título"
            disabled={loading}
          />

        </div>
      </section>

      {/* =========================================
          LOCAL DE VOTAÇÃO
      ========================================= */}

      <section className="form-card">
        <div className="form-card-header">
          <h3>Local de votação</h3>
          <p>Informações do local onde a pessoa vota</p>
        </div>

        <div className="form-card-body leadership-full-field">
          <FormField
            label="Local de votação"
            name="voter_location"
            value={voterLocation}
            onChange={(event) =>
              setVoterLocation(
                event.target.value
              )
            }
            placeholder="Local de votação"
            disabled={loading}
          />

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
            : "Adicionar liderança"
        }
        loadingText="Salvando..."
      />

    </Form>
  );
}