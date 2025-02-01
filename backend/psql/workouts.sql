CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date TIMESTAMP DEFAULT now(),
    notes TEXT,
    type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
