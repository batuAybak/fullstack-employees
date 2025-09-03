import express from "express";
const app = express();
export default app;

app.use(express.json()) // body parsing middleware

app.get('/', (req, res) => {
    res.send('Welcome to the Fullstack Employees API.')
})

import employeesRouter from './api/employees.js'
app.use('/employees', employeesRouter) // route /employees to employees router

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('app.js file : Something went wrong')
})