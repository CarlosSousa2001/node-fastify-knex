import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { randomUUID } from "node:crypto"

export async function transactionsRoutes(app: FastifyInstance){

    app.get("/", async function handler () {
        const transaction = await knex("transactions").insert({
          id: randomUUID(),
          title: "Transação de teste",
          amount: 1000,
        })
        .returning("*")
    
        return transaction
    })

}