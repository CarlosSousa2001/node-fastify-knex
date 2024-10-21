import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database"
import { randomUUID } from "node:crypto"
import {z} from "zod"

export async function transactionsRoutes(app: FastifyInstance){

    app.post("/", async function handler (request: FastifyRequest, reply: FastifyReply) {

        const createTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(["credit", "Debit"])
        })

        const {title, amount, type} = createTransactionsBodySchema.parse(request.body)

        const transaction = await knex("transactions").insert({
          id: randomUUID(),
          title: title,
          amount: type === "credit" ? amount : amount * -1,
        })
    
        return reply.status(201).send
    })

}