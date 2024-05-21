import { CreateLineParams } from '@/interfaces/Requests'
import api from './api'
import { LINES } from './endpoints'

export const createLine = async (data: CreateLineParams) => {
    try {
        const response = await api.post(LINES, data)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getLines = async () => {
    try {
        const response = await api.get(LINES)
        
        return response.data
    } catch (error) {
        console.log(error)
    }
}