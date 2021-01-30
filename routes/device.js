var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/:id/sensors', function(req, res, next) {
    req.db.collection('devices').aggregate(
    [
        { $match: { "_id": ObjectId(req.params.id) }},
        { $project: { sensors: "$sensors", "_id": false}},
        { $unwind: "$sensors" },
        { $project: { type: "$sensors.type", localSensorID: "$sensors.id"}},
        { $lookup: { from: "sensor_type", localField: "type", foreignField: "alias", as: "sensor"} },
        { $project: { type: "$type", "_id": "$localSensorID", name: "$sensor.name"}},
        { $unwind: "$name" }
    ])
    .toArray(function(err, quer)
    {   
        console.log(quer)

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
    req.db.collection('devices').find({"_id": ObjectId(req.params.id)})
    .toArray(function(err, quer)
    {   
        console.log(quer)

        if(err || quer.length !== 1)
        {
            res.status(500)
            res.end("{}")
            console.log(err)
            return
        }

        res.status(200)
        res.end(JSON.stringify(quer[0]))
    });
});


module.exports = router;
