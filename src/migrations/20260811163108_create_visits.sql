CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,

    leadership_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    visit_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,

    visited BOOLEAN NOT NULL DEFAULT FALSE,

    address_zip_code TEXT,
    address_street TEXT,
    address_number TEXT,
    address_complement TEXT,
    address_neighborhood TEXT,
    address_city TEXT,
    address_state TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_visits_leadership
        FOREIGN KEY (leadership_id)
        REFERENCES leaderships(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_visits_leadership_id
ON visits(leadership_id);