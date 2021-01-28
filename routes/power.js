var express = require('express');
var router = express.Router();
const pool = require('../db').getPool();
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.db.collection('power').aggregate([{
        $group:
        {
            _id: "$timestamp",
            value: { $sum: "$value" }
        }
    }])
    .toArray(function(err, quer) {
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
    req.db.collection('power').aggregate(
    [
        { $match: { device: ObjectId(req.params.id) }},
        { $sort: { timestamp: -1 }},
        { $project: { power: "$value" } }])
    .toArray(function(err, quer)
    {
        if(err)
        {
            res.status(500)
            res.end("{}")
            console.log(err)
            return
        }

        console.log(quer)

        res.status(200)
        res.end(JSON.stringify(quer))
    });
});

module.exports = router;
