import express from "express";
import knex from "../database/connection";
import PointsController from '../controllers/pointsControllers'
import ItemsController from '../controllers/itemsControllers'


const routes = express.Router()


const pointsController = new PointsController()
const itemsController = new ItemsController()

// commun names for controllrs methods 
// create update delete show index
routes.get('/items', itemsController.index)


routes.get('/points/', pointsController.index)
routes.get('/points/:id', pointsController.show)
routes.post('/points', pointsController.createItem)

export default routes 