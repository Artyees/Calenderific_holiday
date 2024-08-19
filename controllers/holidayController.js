const axios = require('axios');
const { apiKey, cacheTTL } = require('../config/config');
const { client } = require('../middlewares/redisCache');

const getHolidays = async (req, res) => {
    const { country, year } = req.query;
    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

    try {
        if (!country || !year) {
            return res.status(500).json({ message: 'Please Provide both Country and Year' });
        }
        const response = await axios.get(apiUrl);

        const data = response.data;

        if (data.response.length == 0) {
            return res.status(200).json(data.response);
        }

        // Cache the data
        // client.setex(req.originalUrl, cacheTTL, JSON.stringify(data));

        return res.json(data.response.holidays);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching data from Calendarific API', error: error.message });
    }
};

const getCountries = async (req, res) => {
    const apiUrl = `https://calendarific.com/api/v2/countries?api_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.response.countries;

        // // Cache the data
        // client.setex(req.originalUrl, cacheTTL, JSON.stringify(data));

        return res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Calendarific API', error: error.message });
    }
};

module.exports = { getHolidays, getCountries };
