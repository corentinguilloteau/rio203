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

            if(m.type == "state")
            {
                for(var j = 0; j < Object.keys(m.devicestate).length; j++)
                {
                    var update = { $set : {} };
                    update.$set['state.' + Object.keys(m.devicestate)[j]] = Object.values(m.devicestate)[j];

                    db.collection("devices").updateOne(
                        { "_id": ObjectId(Object.keys(message)[i]) },
                        update
                    )
                } 
                
                for(var k = 0; k < Object.keys(m.sensors).length; k++)
                {
                    var sensorID = Object.keys(m.sensors)[k];
                    var s = Object.values(m.sensors)[k];

                    for(var j = 0; j < Object.keys(s).length; j++)
                    {
                        var update = { $set : {} };
                        update.$set['sensors.$.state.' + Object.keys(s)[j]] = Object.values(s)[j];

                        db.collection("devices").updateOne(
                            { "_id": ObjectId(Object.keys(message)[i]), "sensors.id": parseInt(sensorID) },
                            update
                        )
                    } 
                }
            }
        }
    });
};
