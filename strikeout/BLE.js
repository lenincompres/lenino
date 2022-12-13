// The serviceUuid must match the serviceUuid of the device you would like to connect
let serviceUuid;
let myOnValue = () => null;
let myCharacteristic;
let myValue = 0;
let myBLE;
let isConnected = false;

function setupBLE(uid, onData = () => null){
  // Create a p5ble class
  myBLE = new p5ble();
  serviceUuid = uid.toLowerCase();
  myOnValue = onData;

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);

  // Create a 'Disconnect' button
  const disconnectButton = createButton('Disconnect')
  disconnectButton.mousePressed(disconnectToBle);

  return myBLE;
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function disconnectToBle() {
  // Disonnect to the device
  myBLE.disconnect();
  // Check if myBLE is connected
  isConnected = myBLE.isConnected();
}

function onDisconnected() {
  console.log('Device got disconnected.');
  isConnected = false;
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);

  console.log("gotCharacteristics:", characteristics);
  
  myCharacteristic = characteristics[0];
  // Start notifications on the first characteristic by passing the characteristic
  // And a callback function to handle notifications
  //myBLE.startNotifications(myCharacteristic, onGotCharacteristics);

  myBLE.read(myCharacteristic, gotValue);

  // Check if myBLE is connected
  isConnected = myBLE.isConnected();

  // Add a event handler when the device is disconnected
  myBLE.onDisconnected(onDisconnected);
}

// A function that will be called once got values
function gotValue(error, value) {
  if (error) console.log('error: ', error);
  else myOnValue(value);
  if(!isConnected) return;
  myValue = value;
  myBLE.read(myCharacteristic, 'string', gotValue);
  // After getting a value, call p5ble.read() again to get the value again
  // You can also pass in the dataType
  // Options: 'unit8', 'uint16', 'uint32', 'int8', 'int16', 'int32', 'float32', 'float64', 'string'
}