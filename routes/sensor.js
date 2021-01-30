var express = require('express');
var router = express.Router({mergeParams: true});
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/:sid', function(req, res, next) {
    req.db.collection('devices').aggregate(
    [
        { $match: { "_id": ObjectId(req.params.id) }},
        { $project: { sensors: "$sensors", "_id": false}},
        { $unwind: "$sensors" },
        { $project: { type: "$sensors.type", localSensorID: "$sensors.id", state: "$sensors.state"}},
        { $match: { localSensorID: parseInt(req.params.sid) }},
        { $lookup: { from: "sensor_type", localField: "type", foreignField: "alias", as: "sensor"} },
        { $project: { type: "$type", "_id": "$localSensorID", state: '$state', stateType: '$sensor.state', name: "$sensor.name", data: "$sensor.datas", command: "$sensor.command" }},
        { $unwind: "$name" },
        { $unwind: "$data" },
        { $unwind: "$command" }
    ])
    .toArray(function(err, quer)
    {   
        console.log(quer)
        console.log(req.params.sid)

        if(err)
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

router.get('/:sid/:data', function(req, res, next) {
    req.db.collection('data').aggregate([
        { $match: { type: req.params.data, device: ObjectId(req.params.id), sensor: parseInt(req.params.sid)}},
        { $project: { "_id": false, timestamp: "$timestamp", value: "$value"}}
    ])
    .toArray(function(err, quer)
    {   
        console.log(quer)
        console.log(req.params.sid)

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
