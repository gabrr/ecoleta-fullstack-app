import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
    async index(req: Request, res: Response ) {
        const { city, uf, items } = req.query

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()))


        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct('points.*')

        return res.json(points)

    }

    async createItem(req: Request, res: Response ) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = req.body
    
        // const trx = await knex.transaction()

        const point = {
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        // it returns a list of ids, of the document created
        // but will have only one
        const idCreated = await knex('points').insert(point)
    
        const point_id = idCreated[0]
    
        const pointItems = items.map((item_id: number) => ({
            item_id, 
            point_id
        }))
    
        await knex('point_items').insert(pointItems).catch(err => console.log(err))

        // await trx.commit()
    
        return res.json({
            id: point_id,
            ...point
        })
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const points = await knex('points').where('id', id).first()

        if(!points) {
            return res.status(400).json({mesage: 'Point not found'})
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            // selecting the table 
            // on join method we pass the database to joing, then the field from the first database
            // and the field of the second database.
            .where('point_items.point_id', id)
            .select('items.title')

        return res.json({points, items})
    }
}

export default PointsController