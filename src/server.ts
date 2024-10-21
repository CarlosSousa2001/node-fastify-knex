// Import the framework and instantiate it
import Fastify from "fastify"
import { env } from "./env"
import { transactionsRoutes } from "./routes/transactions"

// const app = Fastify({
//   logger: true
// })

const app = Fastify()

app.register(transactionsRoutes, {
    prefix: "transactions"
})

// Run the server!
app.listen({
    port: env.PORT
}).then(()=> {
    console.log("HTTO sever running")
})