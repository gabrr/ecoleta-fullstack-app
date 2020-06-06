import express from "express";
import Knex from "../database/connection";

const routes = express.Router()

routes.get('/items', async (req, res) => {
    const items = await Knex('items').select('*')

    const sererializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            imageUrl: `http://localhost:5000/uploads/${item.image}`
        }
    })

    return res.json(sererializedItems)
})

export default routes