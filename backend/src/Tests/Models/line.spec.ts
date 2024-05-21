import * as db from '../db'
import { ILine, Line } from '../../Models/line'
import { faker } from '@faker-js/faker'

describe('Line Model Testing', () => {
    beforeAll(async () => {
        await db.connect()
    }, 60000)

    afterEach(async () => {
        await db.clearDatabase()
    }, 60000)
    
    afterAll(async () => {
        await db.closeDatabase()
    }, 60000)

    test('Create Line with Phone Number', async () => {
        const lineData: ILine = {
            ddd: faker.number.int({ max: 99 }),
            email: faker.internet.email(),
            idempotencyKey: faker.string.uuid(),
            pending: false,
            plan: 1,
            phoneNumber: faker.phone.number(),
        }

        const line = new Line(lineData)
        const createdLine = await line.save()
        expect(createdLine).toBeDefined();
        expect(createdLine._id).toBeDefined();
        expect(createdLine.ddd).toBe(lineData.ddd);
        expect(createdLine.email).toBe(lineData.email);
        expect(createdLine.pending).toBeFalsy();
    })

    test('Create Line without Phone Number', async () => {
        const lineData: ILine = {
            ddd: faker.number.int({ max: 99 }),
            email: faker.internet.email(),
            idempotencyKey: faker.string.uuid(),
            pending: false,
            plan: 1,
        }

        const line = new Line(lineData)
        const createdLine = await line.save()
        expect(createdLine).toBeDefined();
        expect(createdLine._id).toBeDefined();
        expect(createdLine.ddd).toBe(lineData.ddd);
        expect(createdLine.email).toBe(lineData.email);
        expect(createdLine.pending).toBeTruthy()
    })

    test('Delete Line', async () => {
        const lineData: ILine = {
            ddd: faker.number.int({ max: 99 }),
            email: faker.internet.email(),
            idempotencyKey: faker.string.uuid(),
            pending: false,
            plan: 1,
            phoneNumber: faker.phone.number(),
        }

        const line = new Line(lineData)
        const createdLine = await line.save()
        expect(createdLine).toBeDefined();
        const deleted = await createdLine.deleteOne()

        expect(deleted).toBeDefined()
        expect(deleted.acknowledged).toBeTruthy()
        expect(deleted.deletedCount).toBe(1)
    })

    test('Update Line', async () => {
        const lineData: ILine = {
            ddd: faker.number.int({ max: 99 }),
            email: faker.internet.email(),
            idempotencyKey: faker.string.uuid(),
            pending: false,
            plan: 1,
        }

        const line = new Line(lineData)
        await line.save()
        const newData = {
            pending: false,
            plan: 2,
            phoneNumber: faker.phone.number(),
        }

        const updateLine = await line.updateOne(newData)

        expect(updateLine).toBeDefined()
        expect(updateLine.modifiedCount).toEqual(1)
        expect(updateLine.matchedCount).toEqual(1)
    })
})