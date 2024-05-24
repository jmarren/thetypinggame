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




-- DB_USER=john-marren
-- DB_HOST=localhost
-- DB_NAME=typing_game_db -- 
-- DB_PASSWORD=popcornsql
-- DB_PORT=5432
-- JWT_SECRET=dde99648693fe9189fbac7db1ec1f4fa6301bc0ae2f097578b90cc44d86890db72c1db78c0ae6cf43142c605bef9b5c902dffbf571236e7897bfb8eb6ec7f6f2










/* 



                                           Table "public.users"
    Column     |           Type           | Collation | Nullable |                Default                 
---------------+--------------------------+-----------+----------+----------------------------------------
 user_id       | integer                  |           | not null | nextval('users_user_id_seq'::regclass)
 username      | character varying(50)    |           | not null | 
 email         | character varying(255)   |           | not null | 
 password_hash | character varying(255)   |           | not null | 
 created_at    | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
    TABLE "games" CONSTRAINT "games_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
    TABLE "scores" CONSTRAINT "scores_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)


                                         Table "public.scores"
  Column   |           Type           | Collation | Nullable |                 Default                  
-----------+--------------------------+-----------+----------+------------------------------------------
 score_id  | integer                  |           | not null | nextval('scores_score_id_seq'::regclass)
 user_id   | integer                  |           |          | 
 score     | integer                  |           | not null | 
 scored_at | timestamp with time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "scores_pkey" PRIMARY KEY, btree (score_id)
Foreign-key constraints:
    "scores_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)



                                                Table "public.games"
        Column         |            Type             | Collation | Nullable |                Default                 
-----------------------+-----------------------------+-----------+----------+----------------------------------------
 game_id               | integer                     |           | not null | nextval('games_game_id_seq'::regclass)
 user_id               | integer                     |           |          | 
 total_characters      | integer                     |           |          | 
 total_mistakes        | integer                     |           |          | 
 total_time            | integer                     |           |          | 
 words_per_minute      | numeric                     |           |          | 
 characters_per_second | numeric                     |           |          | 
 game_date             | timestamp without time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "games_pkey" PRIMARY KEY, btree (game_id)
Foreign-key constraints:
    "games_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
Referenced by:
    TABLE "assessments" CONSTRAINT "assessments_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(game_id)
    TABLE "game_key_stats" CONSTRAINT "game_key_stats_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(game_id)
assessment_id | integer                |           | not null | nextval('assessments_assessment_id_seq'::regclass)
 game_id       | integer                |           |          | 
 type          | character varying(255) |           | not null | 


typing_game_db=> \d  game_key_stats
                                          Table "public.game_key_stats"
     Column      |         Type          | Collation | Nullable |                     Default                     
-----------------+-----------------------+-----------+----------+-------------------------------------------------
 stat_id         | integer               |           | not null | nextval('game_key_stats_stat_id_seq'::regclass)
 game_id         | integer               |           |          | 
 key_char        | character varying(10) |           |          | 
 incorrect_count | integer               |           |          | 
 total_count     | integer               |           |          | 
Indexes:
    "game_key_stats_pkey" PRIMARY KEY, btree (stat_id)
Foreign-key constraints:
    "game_key_stats_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(game_id)
