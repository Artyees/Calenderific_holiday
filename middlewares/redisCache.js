const redis = require('redis');
const { redisHost, redisPort } = require('../config/config');

const client = redis.createClient({
    url: `redis://${redisHost}:${redisPort}`
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.connect().catch(console.error);

const cache = (req, res, next) => {
    const key = req.originalUrl;

    client.get(key)
        .then((data) => {
            if (data) {
                res.send(JSON.parse(data));
            } else {
                res.sendResponse = res.send;
                res.send = (body) => {
                    client.setEx(key, 1800, JSON.stringify(body));
                    res.sendResponse(body);
                };
                next();
            }
        })
        .catch((err) => {
            console.error('Redis GET error:', err);
            next();
        });
};

module.exports = { cache, client };
