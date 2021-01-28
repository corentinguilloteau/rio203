const express = require('express')
const router = express.Router()

var route_rooms = require('./routes/rooms');
router.use('rooms/', route_rooms);

module.exports = router;