CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,

    leadership_id INTEGER NOT NULL,
    activity_type_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,
    activity_date  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    description TEXT,

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

    CONSTRAINT fk_activities_leadership
        FOREIGN KEY (leadership_id)
        REFERENCES leaderships(id),

    CONSTRAINT fk_activities_activity_type
        FOREIGN KEY (activity_type_id)
        REFERENCES activity_types(id)
);