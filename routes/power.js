var express = require('express');
var router = express.Router();
const pool = require('../mysql').getPool();

/* GET users listing. */
router.get('/', function(req, res, next) {
    pool.query("SELECT timestamp, SUM(value) AS value FROM power GROUP BY timestamp", function(err, quer)
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

router.get('/:id', function(req, res, next) {
    pool.query("SELECT t.value AS power FROM power AS t INNER JOIN (SELECT device, MAX(timestamp) AS timestamp FROM power GROUP BY device) AS tm ON t.device = tm.device AND t.timestamp = tm.timestamp", function(err, quer)
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
