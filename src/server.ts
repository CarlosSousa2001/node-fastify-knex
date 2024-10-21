// Import the framework and instantiate it
import Fastify from "fastify"
import { knex } from "./database"
import { randomUUID } from "node:crypto"
import { title } from "node:process"

// const app = Fastify({
//   logger: true
// })

const app = Fastify()

// Declare a route
app.get("/", async function handler (request, reply) {
    const transaction = await knex("transactions").insert({
      id: randomUUID(),
      title: "Transação de teste",
      amount: 1000,
    })
    .returning("*")

    return transaction
})

// Run the server!
app.listen({
    port: 3333
}).then(()=> {
    console.log("HTTO sever running")
})