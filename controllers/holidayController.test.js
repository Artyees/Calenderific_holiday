// __tests__/holidayController.test.js

const request = require('supertest');
const express = require('express');
const axios = require('axios');
const { getHolidays, getCountries } = require('../controllers/holidayController');

jest.mock('axios');

jest.mock('../config/config', () => ({
    apiKey: process.env.apiKey,
}));

const app = express();
app.use(express.json());

app.get('/holidays', getHolidays);
app.get('/countries', getCountries);

describe('Holiday Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /holidays', () => {
        it('should return holidays for a given country and year', async () => {
            const apiResponse = {
                data: {
                    response: {
                        holidays: [
                            { name: 'New Year\'s Day', date: { iso: '2024-01-01' } },
                            { name: 'Christmas Day', date: { iso: '2024-12-25' } }
                        ]
                    }
                }
            };

            axios.get.mockResolvedValue(apiResponse);

            const res = await request(app).get('/holidays?country=US&year=2024');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(apiResponse.data.response.holidays);
        });

        it('should return an error if country or year is missing', async () => {
            const res = await request(app).get('/holidays?country=US');

            expect(res.status).toBe(400);
            expect(res.body).toEqual({ message: 'Please Provide both Country and Year' });
        });

        it('should handle API errors', async () => {
            axios.get.mockRejectedValue(new Error('API error'));

            const res = await request(app).get('/holidays?country=US&year=2024');

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('message', 'Error fetching data from Calendarific API');
        });
    });

    describe('GET /countries', () => {
        it('should return a list of countries', async () => {
            const apiResponse = {
                data: {
                    response: {
                        countries: [
                            { country_name: 'United States', iso3166: 'US', total_holidays: 418, supported_languages: 7, uuid: "0b3b97fa66886c5688ee4ae80ec0c3c2", flag_unicode: "🇺🇸" },
                        ]
                    }
                }
            };

            axios.get.mockResolvedValue(apiResponse);

            const res = await request(app).get('/countries');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(apiResponse.data.response.countries);
        });

        it('should handle API errors', async () => {
            axios.get.mockRejectedValue(new Error('API error'));

            const res = await request(app).get('/countries');

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('message', 'Error fetching data from Calendarific API');
        });
    });
});
