import db from "#db/client";
import { faker } from '@faker-js/faker'
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const name = faker.person.firstName()
    const birthday = faker.date.between({ from: '1950-01-01', to: '2000-01-01' })
    const salary = Math.floor((Math.random() + 1) * 100000)
    await createEmployee({ name, birthday, salary })
  }
}
