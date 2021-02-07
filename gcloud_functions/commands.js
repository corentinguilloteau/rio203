/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const cloudRegion = 'europe-west1';
const deviceId = 'dashboard';
const projectId = 'rio203';
const registryId = 'commands';

const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const iot = require('@google-cloud/iot');
const iotClient = new iot.v1.DeviceManagerClient({
  // optional auth parameters.
});
 
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

        const formattedName = iotClient.devicePath(
            projectId,
            cloudRegion,
            registryId,
            message.gcloudid
        );
        const request = {};

        request[message.deviceID] = {
            gcloudid: message.gcloudid,
            type: "command",
            sensors: {}
        }

        request[message.deviceID].sensors[message.sensordID][message.command] = message.value;
        
        try {
        const responses = await iotClient.sendCommandToDevice(request);
        
        console.log('Sent command: ', responses[0]);
        } catch (err) {
        console.error('Could not send command:', err);
        }
    });
};
