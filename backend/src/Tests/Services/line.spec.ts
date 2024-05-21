import { faker } from '@faker-js/faker'
import { lineService } from '../../Services/line.service'
import * as db from '../db'
import { CreateLineData } from '../../Interfaces/line'

describe('Line Service Testing', () => {
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
        const lineData: CreateLineData = {
            email: faker.internet.email(),
            ddd: faker.number.int({ max: 99 }),
            plan: 1,
        }

        const createdLine = await lineService.createLine(lineData)

        expect(createdLine).toBeDefined();
        expect(createdLine).toBeDefined();
        expect(createdLine._id).toBeDefined();
        expect(createdLine.ddd).toBe(lineData.ddd);
        expect(createdLine.email).toBe(lineData.email);
    })

    test('Get not pending lines success', async () => {
        const lines = await lineService.getLines()
        
        expect(lines).toBeDefined();
        expect(Array.isArray(lines)).toBe(true);
    })

    test('Get pending lines success', async () => {
        const lines = await lineService.getPendingLines()
        
        expect(lines).toBeDefined();
        expect(Array.isArray(lines)).toBe(true);
    })
})