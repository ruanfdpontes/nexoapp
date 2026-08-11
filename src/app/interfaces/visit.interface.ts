export interface Leadership {
  id: number;
  name: string;
  votes_projection: number;
  region: string;

  phone_number: string | null;
  mobile_number: string | null;

  address_cep: string | null;
  address_street: string | null;
  address_number: string | null;
  address_complement: string | null;
  address_neighborhood: string | null;
  address_city: string | null;
  address_state: string | null;

  voter_registration_number: string | null;
  voter_zone: string | null;
  voter_section: string | null;
  voter_city: string | null;
  voter_location: string | null;

  created_at: string;  
  updated_at: string | null;
  deleted_at: string | null;
}