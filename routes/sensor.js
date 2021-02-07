var express = require('express');
var router = express.Router({mergeParams: true});
const {ObjectId} = require('mongodb');
const {readFileSync} = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

// [START iot_mqtt_jwt]
const createJwt = (projectId, privateKeyFile, algorithm) => {
    // Create a JWT to authenticate this device. The device will be disconnected
    // after the token expires, and will have to reconnect with a new token. The
    // audience field should always be set to the GCP project id.
    const token = {
        iat: parseInt(Date.now() / 1000),
        exp: parseInt(Date.now() / 1000) + 20 * 60, // 20 minutes
        aud: projectId,
    };

    const privateKey = readFileSync(privateKeyFile);
    return jwt.sign(token, privateKey, {algorithm: algorithm});
};

const deviceId = `test-client`;
const registryId = `on-premise`;
const region = `europe-west1`;
const algorithm = `RS256`;
const privateKeyFile = `./private.pem`;
const mqttBridgeHostname = `mqtt.googleapis.com`;
const mqttBridgePort = 8883;
const messageType = `events`;
const numMessages = 5;
const projectId = `rio203`;

const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;


let connected = false;

let fifo = [];

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
        { $unwind: "$name" }
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

let client;
const mqttTopic = `/devices/${deviceId}/${messageType}`;

const publishCommands = () =>
{
    while(fifo.length > 0)
    {
        var commmand = fifo.shift();

        client.publish(`/devices/${deviceId}/events`, command, {qos: 1}, (err) =>
        {
            console.log(err);
        });
    }
}

client.on('connect', success => {
    console.log('Connect to MQTT');
    if (!success) {
        console.log('Client not connected...');
    }
    else
    {
        connected = true;
        publishCommands();
    }
});

client.on('close', () => {
    console.log('MQTT client closed');
    connected = false;
  });


const connect = () => {

    const connectionArgs = {
        host: mqttBridgeHostname,
        port: mqttBridgePort,
        clientId: mqttClientId,
        username: 'unused',
        password: createJwt(projectId, privateKeyFile, algorithm),
        protocol: 'mqtts',
        secureProtocol: 'TLSv1_2_method',
    };

    client = mqtt.connect(connectionArgs);
}

router.use(function(req, res, next)
{
    connect();   
})

router.put('/:sid', function(req, res, next) {
    var command = {}

    req.db.collection('devices').aggregate(
        [
            { $match: { "_id": ObjectId(req.params.id) }}
        ])
        .toArray(function(err, quer)
        {   
    
            command[req.params.id] = {
                gcloudid: quer[0].gcid,
                type: "command",
                devicecommand: {},
                sensors:{}
            }

            req.db.collection('devices').aggregate(
                [
                    { $match: { "_id": ObjectId(req.params.id) }},
                    { $project: { sensors: "$sensors", "_id": false}},
                    { $unwind: "$sensors" },
                    { $project: { type: "$sensors.type", localSensorID: "$sensors.id", state: "$sensors.state"}},
                    { $match: { localSensorID: parseInt(req.params.sid) }},
                    { $lookup: { from: "sensor_type", localField: "type", foreignField: "alias", as: "sensor"} },
                    { $project: { stateType: '$sensor.state' }},
                    { $unwind: "$stateType" }
                ])
                .toArray(function(err, quer)
                {   
                    console.log(quer)
            
                    command[req.params.id].sensors[req.params.sid] = {
        
                    }
        
                    command[req.params.id].sensors[req.params.sid][quer[req.body.index]] = req.body.value;
        
                    fifo.push(JSON.stringify(command));

                    if(connected)
                    {
                        publishCommands();
                    }
                    else
                    {
                        connect();
                    }   

                    res.status(200);
                    res.send();
                });

        });
})

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
