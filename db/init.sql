CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    salt VARCHAR(100) NOT NULL
);

CREATE TABLE diaries (
    id SERIAL PRIMARY KEY,
    context TEXT,
    status VARCHAR(50),
    writer_id VARCHAR(36),
    week VARCHAR(50),
);
