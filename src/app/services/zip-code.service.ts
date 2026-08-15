import ZipCodeResponse from "../interfaces/zip-code.interface";

export async function getAddressByZipCode(
  cep: string
): Promise<ZipCodeResponse> {
  const cleanZipCode = cep.replace(/\D/g, "");

  if (cleanZipCode.length !== 8) {
    throw new Error("CEP inválido");
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${cleanZipCode}/json/`
  );

  if (!response.ok) {
    throw new Error("Erro ao consultar CEP");
  }

  const data: ZipCodeResponse = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }

  return data;
}