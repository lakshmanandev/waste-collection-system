"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const collectionService_1 = require("../src/services/collectionService");
describe('Collection API', () => {
    beforeEach(() => {
        (0, collectionService_1.resetCollectionsForTests)();
    });
    it('creates a collection successfully', async () => {
        const payload = {
            qr_id: 'BAG001',
            weight: 10,
            timestamp: '2026-10-03T10:30:00.000Z',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/api/collections').send(payload);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Collection successful');
        expect(response.body.data).toMatchObject({
            qr_id: 'BAG001',
            weight: 10,
            points: 150,
            timestamp: '2026-10-03T10:30:00.000Z',
        });
    });
    it('returns validation error for invalid weight', async () => {
        const payload = {
            qr_id: 'BAG002',
            weight: -1,
            timestamp: '2026-10-03T10:30:00.000Z',
        };
        const response = await (0, supertest_1.default)(app_1.default).post('/api/collections').send(payload);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid collection data');
    });
    it('returns conflict for duplicate QR ID', async () => {
        const payload = {
            qr_id: 'BAG003',
            weight: 8,
            timestamp: '2026-10-03T10:30:00.000Z',
        };
        await (0, supertest_1.default)(app_1.default).post('/api/collections').send(payload);
        const duplicateResponse = await (0, supertest_1.default)(app_1.default).post('/api/collections').send(payload);
        expect(duplicateResponse.status).toBe(409);
        expect(duplicateResponse.body.message).toBe('This bag has already been collected');
    });
    it('retrieves collections in newest-first order', async () => {
        await (0, supertest_1.default)(app_1.default).post('/api/collections').send({
            qr_id: 'BAG001',
            weight: 10,
            timestamp: '2026-10-03T10:30:00.000Z',
        });
        await (0, supertest_1.default)(app_1.default).post('/api/collections').send({
            qr_id: 'BAG002',
            weight: 5,
            timestamp: '2026-10-03T11:00:00.000Z',
        });
        const response = await (0, supertest_1.default)(app_1.default).get('/api/collections');
        expect(response.status).toBe(200);
        expect(response.body.data[0].qr_id).toBe('BAG002');
        expect(response.body.data).toHaveLength(2);
    });
});
