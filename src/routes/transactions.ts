import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database"
import { randomUUID } from "node:crypto"
import { z } from "zod"

export async function transactionsRoutes(app: FastifyInstance) {


    app.get("/", async () => {
        const transactions = await knex("transactions").select()

        return {
            transactions
        }
    })


    app.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        const getTrasacntionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTrasacntionParamsSchema.parse(request.params)

        const transaction = await knex("transactions").where("id", id).first()

        if (!transaction) {
            return {
                message: "transaction not found"
            }
        }

        return {
            transaction
        }
    })

    app.post("/", async function handler(request: FastifyRequest, reply: FastifyReply) {

        const createTransactionsBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(["credit", "Debit"])
        })

        const { title, amount, type } = createTransactionsBodySchema.parse(request.body)
        
        let sessionId = request.cookies.sessionId

        if(!sessionId) {
            sessionId = randomUUID()
            reply.cookie("sessionId", sessionId, {
                path: "/",
                maxAge: 60 * 60 * 24
            })
        }

        await knex("transactions").insert({
            id: randomUUID(),
            title: title,
            amount: type === "credit" ? amount : amount * -1,
            sesseion_id: sessionId
        })

        return reply.status(201).send
    })

    app.get("/summary", async () => {
        const summary = await knex("transactions").sum("amount", {as: "amount"}).first()

        return {
            summary
        }
    })

}