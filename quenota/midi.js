// read midi input and
// Lenin compres

let command, note, velocity;

if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(midiMessage) {
  [command, note, vel] = midiMessage.data;
  // nothing
  if(command == 254) return;
  // note down
  if(command == 144) return playNote(note, vel);
  // not up
  if(command === 128) return stopNote(note);
  // pedal
  if(command === 177) return sustain(!!vel);
  // console.log(command, note, vel);
}