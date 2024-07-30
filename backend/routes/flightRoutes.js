const express = require('express');
const { getFlights, getNotifications} = require('../controllers/flightControllers');

const router = express.Router();

router.get('/flights', getFlights);
router.post('/notifications', getNotifications)
module.exports = router;
