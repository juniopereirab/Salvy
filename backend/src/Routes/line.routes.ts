import express from "express"
import { lineController } from "../Controllers/line.controller"

export const lineRouter = express.Router()

lineRouter.get('/lines', lineController.getLines)
lineRouter.post('/lines', lineController.createLine)