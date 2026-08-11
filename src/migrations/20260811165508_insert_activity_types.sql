INSERT INTO activity_types (name)
VALUES
    ('Caminhada'),
    ('Porta a porta'),
    ('Café da manhã ou tarde'),
    ('Panfletagem'),
    ('Adesivaço'),
    ('Carreta')
ON CONFLICT (name) DO NOTHING;