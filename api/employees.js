import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

function checkInteger(id) {
    if (!/^-?\d+(\.\d+)?$/.test(id) || id < 0) return res.status(400).send('Only enter positive integers')
}

router.route('/')
    .get(async (req, res) => { // get all employees
        try {
            const employees = await getEmployees()
            res.send(employees)
        } catch (error) {
            res.status(400).send(`Get employees failed: ${error}`)
        }
    })
    .post(async (req, res) => { // Add an employee
        try {
            const { name, birthday, salary } = req.body
            if (!req.body || !name || !birthday || !salary) return res.status(400).send('Missing fields') // if no body or missing fields => 400
            const newEmp = await createEmployee(req.body)
            res.status(201).send(newEmp)
        } catch (error) {
            res.status(400).send(`${error}`)
        }
    })

router.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params // id is string
            checkInteger(id)

            const emp = await getEmployee(id) // call DB for the employee
            if (!emp) return res.status(404).send('Employee doesn\'t exist') //check if employee exists
            res.status(200).send(emp)
        } catch (error) {
            res.status(400).send(`${error}`)
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params
            checkInteger(id)

            const response = await deleteEmployee(id)
            if (!response) return res.status(404).send('Employee doesn\'t exist')
            return res.sendStatus(204)
        } catch (error) {
            res.status(400).send(`${error}`)
        }
    })
    .put(async (req, res) => {
        try {
            const { id } = req.params
            checkInteger(id)

            const { name, birthday, salary } = req.body
            if (!req.body || !name || !birthday || !salary) return res.status(400).send('Missing fields') // if no body or missing fields => 400

            const updatedEmployee = await updateEmployee({ id, name, birthday, salary })
            if (!updatedEmployee) return res.status(404).send('Error: Trying to update an employee that doesn\'t exist')

            res.status(200).send(updatedEmployee)
        } catch (error) {
            res.status(400).send(`${error}`)
        }
    })
