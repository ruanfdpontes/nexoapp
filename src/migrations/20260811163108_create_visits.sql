CREATE TABLE IF NOT EXISTS visits (
    id SERIAL PRIMARY KEY,

    leadership_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    visit_date DATE,

    visited BOOLEAN NOT NULL DEFAULT FALSE,

    address_street VARCHAR(255),
    address_number VARCHAR(20),
    address_neighborhood VARCHAR(150),
    address_city VARCHAR(150),
    address_state VARCHAR(2),
    address_zip_code VARCHAR(10),

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