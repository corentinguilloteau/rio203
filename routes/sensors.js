var express = require('express');
var router = express.Router();
const pool = require('../mysql').getPool();

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query("SELECT iddevice AS id, device.name, gcid, rooms.name AS room FROM device JOIN rooms ON room = idrooms", function(err, quer)
    {
        if(err)
        {
            res.status(500)
            res.end("{}")
            console.log(err)
            return
        }

        res.status(200)
        res.end(JSON.stringify(quer))
    });
});

module.exports = router;
