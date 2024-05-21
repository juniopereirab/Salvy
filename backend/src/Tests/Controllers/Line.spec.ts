import { faker } from '@faker-js/faker'
import { lineController } from '../../Controllers/line.controller'
import * as db from '../db'
import { Request, Response } from 'express'

describe('Line Controller Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Create line success', async () => {
        const req = {
            body: {
                email: faker.internet.email(),
                ddd: faker.string.numeric(2),
                plan: 1
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await lineController.createLine(req, res);

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: req.body.email }))
    })

    test('Create line error', async () => {
        const req = {
            body: {
                email: faker.internet.email(),
                ddd: "error",
                plan: "error"
            }
        } as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await lineController.createLine(req, res);

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Erro ao criar linha telefonica' }))
    })

    test('Get line list success', async () => {
        const req = {} as unknown as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response

        await lineController.getLines(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([]))
    })
})