import { Request, Response } from "express";
import { lineService } from "../Services/line.service";
import { LineSchemaValidate } from "../Models/line";

class LineController {
    async createLine(req: Request, res: Response) {
        const { ddd, email, plan } = req.body
        const data = { ddd, email, plan }

        const { error } = LineSchemaValidate.validate(data)

        if (error) {
            return res.status(400).json({ error: 'Erro ao criar linha telefonica' })
        }

        const line = await lineService.createLine(data)

        return res.status(201).json(line)
    }

    async getLines(req: Request, res: Response) {
        try {
            const lines = await lineService.getLines()

            return res.status(200).json(lines)
        } catch (error) {
            return res.status(400).json({ error: "Erro ao consultar listagem de linhas" })
        }
        
    }
}

export const lineController = new LineController()