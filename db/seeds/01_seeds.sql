-- Users table seeds
INSERT INTO users (name, email, password) VALUES ('Tobias Funke', 'blueManGroup@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Gob Bluth', 'gr8testMagician@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' );

-- Categories table seeds
INSERT INTO categories (id, category_name) VALUES (0, 'uncategorized');
INSERT INTO categories (category_name) VALUES ('to_watch');
INSERT INTO categories (category_name) VALUES ('to_eat');
INSERT INTO categories (category_name) VALUES ('to_read');
INSERT INTO categories (category_name) VALUES ('to_buy');

-- Tasks table seed to_watch (category 1)
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 1, 'Breaking Bad', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 1, 'Arrested Development', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 1, 'The Wire', FALSE);

-- Tasks table seed  to_eat (category 2)
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 2, 'Cactus Club', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 2, 'Five Guys', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 2, 'Earls', FALSE);

-- Tasks table seed  to_read (category 3)
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 3, 'Twilight', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 3, 'Dune', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 3, 'The Iliad', FALSE);

-- Tasks table seed  to_buy (category 4)
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 4, 'Socks', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 4, 'Keyboard', FALSE);
INSERT INTO tasks (user_id, category_id, task_name, is_complete) VALUES (1, 4, 'Scissors', FALSE);
