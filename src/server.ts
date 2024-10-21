// Import the framework and instantiate it
import Fastify from "fastify"
import { knex } from "./database"

// const app = Fastify({
//   logger: true
// })

const app = Fastify()

// Declare a route
app.get("/", async function handler (request, reply) {
    const tables = await knex("sqlite_schema").select("*")

    return tables
})

// Run the server!
app.listen({
    port: 3333
}).then(()=> {
    console.log("HTTO sever running")
})