const {readFileSync} = require('fs');
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

// Create a Cloud IoT Core JWT for the given project id, signed with the given
// private key.
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
// [END iot_mqtt_jwt]

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

// The mqttClientId is a unique string that identifies this device. For Google
// Cloud IoT Core, it must be in the format below.
const mqttClientId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;

// With Google Cloud IoT Core, the username field is ignored, however it must be
// non-empty. The password field is used to transmit a JWT to authorize the
// device. The "mqtts" protocol causes the library to connect using SSL, which
// is required for Cloud IoT Core.
const connectionArgs = {
  host: mqttBridgeHostname,
  port: mqttBridgePort,
  clientId: mqttClientId,
  username: 'unused',
  password: createJwt(projectId, privateKeyFile, algorithm),
  protocol: 'mqtts',
  secureProtocol: 'TLSv1_2_method',
};

// Create a client, and connect to the Google MQTT bridge.
const iatTime = parseInt(Date.now() / 1000);
const client = mqtt.connect(connectionArgs);



// The MQTT topic that this device will publish data to. The MQTT topic name is
// required to be in the format below. The topic name must end in 'state' to
// publish state and 'fsdfdevents' to publish telemetry. Note that this is not the
// same as the device registry's Cloud Pub/Sub topic.
const mqttTopic = `/devices/${deviceId}/${messageType}`;

client.on('connect', success => {
  console.log('connect');
  if (!success) {
    console.log('Client not connected...');
  }
  else
  {
    client.publish(`/devices/${deviceId}/events`, "Test message", {qos: 1}, (err) =>
    {
      console.log(err);
    });
  }
});

client.on('close', () => {
  console.log('close');
  shouldBackoff = true;
});

client.on('error', err => {
  console.log('error', err);
});

client.on('message', (topic, message) => {
  let messageStr = 'Message received: ';
  if (topic === `/devices/${deviceId}/config`) {
    messageStr = 'Config message received: ';
  } else if (topic.startsWith(`/devices/${deviceId}/commands`)) {
    messageStr = 'Command message received: ';
  }

  messageStr += Buffer.from(message, 'base64').toString('ascii');
  console.log(messageStr);
});

client.on('packetsend', () => {
  console.log("Packet sent")
});

// Once all of the messages have been published, the connection to Google Cloud
// IoT will be closed and the process will exit. See the publishAsync method.