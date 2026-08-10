"use client";

import {
  Form,
  FormActions,
  FormField,
} from "@/app/components/form";
import { Lidership } from "@/app/interfaces/lidership.interface";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

interface LidershipFormPartialProps {
  lidership?: Lidership | null;
  onCancel: () => void;
  onSuccess?: () => void;
}


export default function LidershipFormPartial({
  lidership = null,
  onCancel,
  onSuccess,
}: LidershipFormPartialProps) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [loading, setLoading] = useState(false);

  const isEditing = !!lidership;


  /* =========================================
     CARREGAR DADOS PARA EDIÇÃO
  ========================================= */

  useEffect(() => {
    if (lidership) {
      setName(lidership.name ?? "");
      setPhone(lidership.phone ?? "");
      setAddress(lidership.address ?? "");
      setNeighborhood(
        lidership.neighborhood ?? ""
      );
    } else {
      setName("");
      setPhone("");
      setAddress("");
      setNeighborhood("");
    }
  }, [lidership]);


  /* =========================================
     SALVAR
  ========================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        isEditing
          ? `/api/liderships/${lidership?.id}`
          : "/api/liderships",
        {
          method: isEditing
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            phone,
            address,
            neighborhood,
          }),
        }
      );


      if (!response.ok) {
        throw new Error(
          "Não foi possível salvar a liderança."
        );
      }


      onSuccess?.();

    } catch (error) {

      console.error(
        "Erro ao salvar liderança:",
        error
      );

    } finally {

      setLoading(false);

    }
  }


  /* =========================================
     FORMULÁRIO
  ========================================= */

  return (
    <Form onSubmit={handleSubmit}>

      <FormField
        label="Nome"
        name="name"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="Digite o nome da liderança"
        required
        disabled={loading}
      />


      <FormField
        label="Telefone"
        name="phone"
        type="tel"
        value={phone}
        onChange={(event) =>
          setPhone(event.target.value)
        }
        placeholder="(00) 00000-0000"
        disabled={loading}
      />


      <FormField
        label="Endereço"
        name="address"
        value={address}
        onChange={(event) =>
          setAddress(event.target.value)
        }
        placeholder="Digite o endereço"
        disabled={loading}
      />


      <FormField
        label="Bairro"
        name="neighborhood"
        value={neighborhood}
        onChange={(event) =>
          setNeighborhood(
            event.target.value
          )
        }
        placeholder="Digite o bairro"
        disabled={loading}
      />


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