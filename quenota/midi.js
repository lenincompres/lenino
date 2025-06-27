// Read midi input and
// by Lenin compres

if (navigator.requestMIDIAccess) console.log("This browser supports WebMIDI!");
else console.error("WebMIDI is not supported in this browser.");

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
}

function onMIDIFailure() {
    console.error("Could not access your MIDI devices.");
}

function onMIDISuccess(midiAccess) {
    midiAccess.inputs.values().forEach(input => input.onmidimessage = getMIDIMessage);
}

function getMIDIMessage(midiMessage) {
  let [command, note, vel] = midiMessage.data;
  if(command == 254) return; // nothing
  if(command == 144 && playNote) return playNote(note, vel);  // note down
  if(command === 128 && stopNote) return stopNote(note);  // note up
  if(command === 177 && sustain) return sustain(!!vel);  // pedal
}