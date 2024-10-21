// Import the framework and instantiate it
import Fastify from "fastify"

const app = Fastify({
  logger: true
})

// Declare a route
app.get("/", async function handler (request, reply) {
  return { hello: "world" }
})

// Run the server!
app.listen({
    port: 3333
}).then(()=> {
    console.log("HTTO sever running")
})