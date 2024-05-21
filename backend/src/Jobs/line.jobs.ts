import axios from "axios";
import { lineService } from "../Services/line.service";
import { Line } from "../Models/line";
import { emailService } from "../Services/email.service";
import { io } from "../Server/app";
const { TOM_API_TOKEN } = process.env

class LineJobs {
    async createLineInBackground() {
        try {
            console.log('Executando rotina de criação de linhas em background!');
            const baseUrl = 'API_EXTERNA'

            const pendingLines = await lineService.getPendingLines()
            if (pendingLines.length > 0) {
                const promises = await Promise.all(pendingLines.map(async (line) => {
                    try {
                        const response = await axios.post(baseUrl, {
                            areaCode: line.ddd,
                            subscriptionPlanId: line.plan,
                            idempotencyKey: line.idempotencyKey,
                        }, {headers: {'x-api-key': TOM_API_TOKEN}})

                        const updatedLine = await Line.updateOne({_id: line._id}, {
                            phoneNumber: response.data.phoneNumber,
                            pending: false,
                        })

                        emailService.sendEmail(line.email, response.data.phoneNumber)
                        return updatedLine
                    } catch (error) {
                        return null
                    }
                }))

                const createdLines = promises.filter((promise) => promise !== null).length

                

                if (createdLines > 0) {
                    console.log(createdLines + ' Linhas Criadas')
                    io.emit("newPendingLines", createdLines)
                } else {
                    console.log('Nenhuma linha criada, será feita uma nova tentativa')
                }
            }
        } catch (error) {
            console.log('Erro ao executar rotina de criação de linhas em background');
        }
    }
}

export const lineJobs = new LineJobs()