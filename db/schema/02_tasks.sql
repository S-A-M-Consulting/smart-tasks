DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id),
  task VARCHAR(255) NOT NULL,
  isComplete BOOLEAN
);
