ALTER DATABASE typing_game_db OWNER TO john-marren;
REVOKE ALL ON DATABASE typing_game_db FROM PUBLIC;
GRANT ALL PRIVILEGES ON DATABASE typing_game_db TO johnmarren;

CREATE TABLE assessments (
    assessment_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id)
    type VARCHAR(255) NOT NULL
);


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    total_characters INTEGER,
    total_mistakes INTEGER,
    total_time INTEGER,
    words_per_minute NUMERIC,
    characters_per_second NUMERIC,
    game_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )

CREATE TABLE game_key_stats (
    stat_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id)
    key_char VARCHAR(10) NOT NULL,
    incorrect_count INTEGER,
    total_count INTEGER
);



CREATE TABLE scores (
  score_id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  score INTEGER NOT NULL,
  scored_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
