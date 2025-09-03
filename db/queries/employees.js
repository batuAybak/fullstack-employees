import db from '#db/client'

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const SQL = `INSERT INTO employees(name, birthday, salary) VALUES($1, $2, $3) RETURNING *` //returns what's added
  const { rows: addedEmployees } = await db.query(SQL, [name, birthday, salary]) // returns values of rows from the obj
  return addedEmployees[0]
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const SQL = `SELECT * FROM employees`
  const { rows: employees } = await db.query(SQL) // returns values of rows from the obj
  return employees
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const sql = `SELECT * FROM employees where id = $1`
  const { rows } = await db.query(sql, [id])
  if (rows.length == 0) return undefined
  return rows[0]
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
  UPDATE employees
  SET
    name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
  `
  const { rows } = await db.query(sql, [id, name, birthday, salary])
  if (rows.length < 0) return undefined
  return rows[0]
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const employees = await getEmployees() // first, check if employee exist before trying to delete
  const employeeExists = employees.find((employee) => {
    return employee.id == +id
  })
  if (!employeeExists) return undefined //if not, return undefined

  const sql = `DELETE FROM employees WHERE id = $1` //if exists then delete
  return await db.query(sql, [id])
}
