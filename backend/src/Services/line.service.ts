import axios, { AxiosError } from "axios";
import { CreateLineData } from "../Interfaces/line";
import { Line } from "../Models/line";
import { v4 } from "uuid";
const { TOM_API_TOKEN } = process.env

class LineService {
  async createLine(data: CreateLineData) {
    const { ddd, email, plan } = data
    const idempotencyKey = v4();
    try {
      const baseUrl = 'API_EXTERNA'

      const response = await axios.post(baseUrl, {
        areaCode: Number(ddd),
        subscriptionPlanId: Number(plan),
        idempotencyKey,
      }, {headers: {'x-api-key': TOM_API_TOKEN}})
  
      const newLine = await Line.create({
        ddd,
        email,
        plan,
        idempotencyKey,
        phoneNumber: response.data.phoneNumber
      })
      return newLine
    } catch (error) {
      const newLine = await Line.create({
        ddd,
        email,
        plan,
        idempotencyKey,
      })
      return newLine
    }
  }

  async getLines() {
    try {
      const lines = await Line.find({ pending: false })

      return lines
    } catch (error) {
      throw error
    }
  }

  async getPendingLines() {
    try {
      const lines = await Line.find({ pending: true })

      return lines
    } catch (error) {
      throw error
    }
  }
}

export const lineService = new LineService()