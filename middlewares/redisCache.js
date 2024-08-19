const redis = require('redis');
const { redisHost, redisPort } = require('../config/config');

const client = redis.createClient({
    host: redisHost,
    port: redisPort,
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});


const cache = (req, res, next) => {
    const key = req.originalUrl;

    client.get(key, (err, data) => {
        if (err) throw err;

        if (data) {
            res.send(JSON.parse(data));
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                client.setex(key, 1800, JSON.stringify(body));
                res.sendResponse(body);
            };
            next();
        }
    });
};

module.exports = { cache, client };
