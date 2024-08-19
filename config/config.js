require('dotenv').config();

module.exports = {
    apiKey: process.env.CALENDARIFIC_API_KEY,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    cacheTTL: process.env.CACHE_TTL,
};
