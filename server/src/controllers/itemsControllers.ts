import knex from '../database/connection'
import { Request, Response } from "express";

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await knex('items').select('*')

        const sererializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                imageUrl: `http://localhost:5000/uploads/${item.image}`
            }
        })

        return res.json(sererializedItems)
    }
}

export default ItemsController