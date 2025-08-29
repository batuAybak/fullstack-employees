DROP TABLE IF EXISTS employees;
\echo creating table: employees
CREATE TABLE employees (
    id serial PRIMARY KEY,
    name text,
    birthday date,
    salary integer
)
