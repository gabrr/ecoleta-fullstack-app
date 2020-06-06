import express from "express";
import cors from 'cors'
import routes from './routes'
import path from 'path'


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(port, () => console.log(`Listening on port ${port}`))