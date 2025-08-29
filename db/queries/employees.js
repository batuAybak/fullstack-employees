import db from '#db/client'

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const SQL = `INSERT INTO employees(name, birthday, salary) VALUES($1, $2, $3) RETURNING *` //returns what's added
    const { rows: addedEmployees } = await db.query(SQL, [name, birthday, salary]) // returns values of rows from the obj
    // console.log(await getEmployees()) // TODO Delete it at the end, just added for debugging.
    return addedEmployees
  } catch (error) {
    console.error(error);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const SQL = `SELECT * FROM employees`
    const { rows: employees } = await db.query(SQL) // returns values of rows from the obj
    return employees
  } catch (error) {
    console.error(error)
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
}
