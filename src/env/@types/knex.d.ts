// eslint-disable-next-line
import "knex"
// ou faça apenas:
// import 'knex'
declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      sesseion_id?: string
    }
  }
}