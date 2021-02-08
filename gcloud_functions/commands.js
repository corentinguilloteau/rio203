/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const cloudRegion = 'europe-west1';
const deviceId = 'dashboard';
const projectId = 'rio203';
const registryId = 'fit-iot';

const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const assert = require('assert');
const iot = require('@google-cloud/iot');
 
const url = 'mongodb://dashboard:dashboard@10.132.0.6:27017';
const dbName = 'rio';

exports.helloPubSub = async (event, context) => {
    const message = JSON.parse(Buffer.from(event.data, 'base64').toString())
    console.log(message);

    const iotClient = new iot.v1.DeviceManagerClient({
        // optional auth parameters.
        });

    const formattedName = iotClient.devicePath(
        projectId,
        cloudRegion,
        registryId,
        message.gcloudid
    );
    const m = {};

    m[message.deviceID] = {
        gcloudid: message.gcloudid,
        type: "command",
        sensors: {
            [message.sensorID]: {
                [message.command]: message.value
            }
        }
    }

    m[message.deviceID].sensors[message.sensorID][message.command] = message.value;
    
    console.log(m)

    request = {
        name: formattedName,
        binaryData: Buffer.from(JSON.stringify(m)),
        subfolder: "cmd"
    }

    try {
    const responses = await iotClient.sendCommandToDevice(request);
    
    console.log('Sent command: ', responses[0]);
    } catch (err) {
    console.error('Could not send command:', err);
        }
};
