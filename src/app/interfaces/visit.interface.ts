export default interface Visit {
  id: number;

  title: string;
  description?: string | null;
  visit_date?: string | null;
  visited: boolean;

  address_zip_code?: string | null;
  address_street?: string | null;
  address_number?: string | null;
  address_complement?: string | null;
  address_neighborhood?: string | null;
  address_city?: string | null;
  address_state?: string | null;

  leadership_id: number;
  leadership_name?: string | null;
  leadership_region?: string | null;
  leadership_neighborhood?: string | null;

  created_at?: string;
  updated_at?: string;
}