CREATE TABLE IF NOT EXISTS leaderships (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    votes_projection INTEGER NOT NULL DEFAULT 0,
    region TEXT NOT NULL,

    phone_number TEXT,
    mobile_number TEXT,

    address_cep TEXT,
    address_street TEXT,
    address_number TEXT,
    address_complement TEXT,
    address_neighborhood TEXT,
    address_city TEXT,
    address_state TEXT,

    voter_registration_number TEXT,
    voter_zone TEXT,
    voter_section TEXT,
    voter_city TEXT,
    voter_location TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);