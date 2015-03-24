// Scales
// ======
// For now the synth can play eight notes that corespond to a given
// scale. I hope to make this more flexible in the future and allow
// the user to control this. For now we just have A minor...
let aMinorNotes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440];

// Synth Class
// ===========
// A wrapper class for the Web Audio Api. Produces a monophonic
// synthesizor that stops the previous note as new notes begin to play.
export default class Synth {

    /**
     * @constructor
     *
     * create a new web audio context;
     *
     **/
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext);
    }

    /**
     * Creates, connects, and starts a new note. Also
     * stops the previous note if it exists (Sequencer is
     * monophonic).
     *
     * @param {number} note Frequency value (in hertz) for the
     * note to be played.
     **/
    playNote(note) {
        let newOsc = this.ctx.createOscillator();
        newOsc.frequency.value = aMinorNotes[note];

        //stop the last note if it exists
        this.stopLastNote();

        //connect and play the new note.
        newOsc.connect(this.ctx.destination);
        newOsc.start();

        this.currentOsc = newOsc;
    }

    /**
     * stop the last note
     **/
    stopLastNote() {
        if (this.currentOsc) {
            this.currentOsc.stop();
        }
    }
}
