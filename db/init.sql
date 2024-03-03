CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    salt VARCHAR(100) NOT NULL
);

CREATE TABLE diaries (
    id VARCHAR(36) PRIMARY KEY,
    context TEXT,
    footer TEXT,
    header TEXT,
    status VARCHAR(50),
    week VARCHAR(50),
    writer VARCHAR(50)
);