DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

--Have hard coded users, no functionality to create at this point in time
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL DEFAULT 1,
  category_id INTEGER REFERENCES categories(id),
  task_name VARCHAR(255) NOT NULL,
  task_description VARCHAR(1000),
  url_image VARCHAR(255),
  link_url VARCHAR(1000) DEFAULT '#',
  is_complete BOOLEAN
);
