CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,

    leadership_id INTEGER NOT NULL,
    activity_type_id INTEGER NOT NULL,

    title VARCHAR(255) NOT NULL,
    activity_date DATE,
    description TEXT,

    address_street VARCHAR(255),
    address_number VARCHAR(20),
    address_neighborhood VARCHAR(150),
    address_city VARCHAR(150),
    address_state VARCHAR(2),
    address_zip_code VARCHAR(10),

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