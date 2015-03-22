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
        var newOsc = this.ctx.createOscillator();
        newOsc.frequency.value = note;

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
