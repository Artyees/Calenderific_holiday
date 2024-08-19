const express = require('express');
const { getHolidays, getCountries } = require('../controllers/holidayController');
const { cache } = require('../middlewares/redisCache');

const router = express.Router();

// router.get('/holidays', cache, getHolidays);
// router.get('/countries', cache, getCountries);

router.get('/holidays', getHolidays);
router.get('/countries', getCountries);

module.exports = router;
