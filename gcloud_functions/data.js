/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
 
const url = 'mongodb://dashboard:dashboard@10.132.0.6:27017';
const dbName = 'rio';

function getType(sensorID)
{
    switch(sensorID)
    {
        case 0:
            return "heat";
        case 1:
            return "humidity"
        case 2:
            return "gaz"
    }
}

exports.helloPubSub = (event, context) => {
    console.log(Buffer.from(event.data, 'base64').toString())
    const message = JSON.parse(Buffer.from(event.data, 'base64').toString())
    console.log(message);

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected to the database");
        
        const db = client.db(dbName);

        for(var i = 0; i < Object.keys(message).length; i++)
        {
            var m = Object.values(message)[i];
            if(m.type == "telemetry")
            {
                for(var j = 0; j < Object.keys(m.sensors).length; j++)
                {
                    var s = Object.values(m.sensors)[i];
                    db.collection('data').insertOne(
                        {
                            "_id": new ObjectId(),
                            device: ObjectId(Object.keys(message)[i]),
                            sensor: parseInt(Object.keys(m.sensors)[i].toString()),
                            type: getType(parseInt(Object.keys(m.sensors)[i].toString())),
                            value: s.value,
                            timestamp: Math.floor(Date.now() / 1000)
                        }
                    )
                }
            }
            else if(m.type == "power")
            {
                db.collection('data').insertOne(
                    {
                        "_id": new ObjectId(),
                        device: ObjectId(Object.keys(message)[i]),
                        value: m.sensor[0].value,
                        timestamp: Math.floor(Date.now() / 1000)
                    }
                )
            }
        }
    });
};
