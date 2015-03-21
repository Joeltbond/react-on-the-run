(function() {
    'use strict';
    var aMinorNotes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440];

    // Clock class
    // -----------
    // Controls timers based on given note values and bpms.
    class Clock {

        /**
         * @constructor
         *
         * Converts given note value and beats per minute (bpm) value
         * to an interval in milliseconds and stores it as a property on
         * a newly created clock object.
         *
         * @param {number} noteType Aj number representing the note
         * value. E.g. 4 for quarter notes, 8 for eighth 
         * notes, 1 for whole notes.
         *
         * @param {number} bpm Beats Per minute.
         * */
	constructor(noteType, bpm) {
	    this.speed = 60000/(bpm * (noteType / 4));
	}
	
        /**
         * Repeatedly invoke a callback at the speed calculated by
         * th constructor.
         *
         * @param {callback} callback The function to be invoked
         * on the beat.
         */
	start(callback) {
	    this.timer = window.setInterval(callback, this.speed);
	}

        /**
         * Clear the timer.
         * */
        stop() {
	    window.clearInterval(this.timer)
	}
    }

    // SynthEngine class
    // ----------------
    //
    // creates and keeps track of web audio oscillators
    class SynthEngine {

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

    var Synth = React.createClass({
        render() {
            return (
                <div>
                    <Sequencer />
                </div>
            );
        }
    });

    var Sequencer = React.createClass({
        render() {
            var columns = [];

            this.state.pattern.forEach((note, index) => {
                columns.push(<StepColumn
                    note={note}
                    step={index}
                    key={index}
                    onNoteChange={this.handleNoteChange}
                    active={index === this.state.currentStep &&
                        this.state.on}
                    />);
            });

            if (this.synth) {
                if (this.state.on) {
                    this.synth.playNote(aMinorNotes[this.state.pattern[this.state.currentStep]]);
                } else {
                    this.synth.stopLastNote();
                }
            }

            return (
                <div className="Sequencer">
                    <div className="display">
                        {aMinorNotes[this.state.pattern[this.state.currentStep]]}
                    </div>
                    <div className="steps-wrapper">
                        {columns}
                    </div>
                    <div className="transport">
                        <button onClick = {this.toggleSound}>{
                            this.state.on ? 'off' : 'on'
                        }</button>
                        <button onClick = {this.stepForward}>Step</button>
			<button onClick = {this.startOrStop}>{
			    this.state.started ? 'stop' : 'start'
			}</button>
                    </div>
                </div>
            );
        },

        componentWillMount() {
            this.synth = new SynthEngine();
        },

        getInitialState() {
            return {
                pattern: [0, 1, 2, 3, 4, 5, 6, 7],
                currentStep: 0,
                on: false,
		started: false
            };
        },

        handleNoteChange(step, note) {
            var pattern = this.state.pattern.slice();
            pattern[step] = note;
            this.setState({
                pattern: pattern
            });
        },

        stepForward() {
            var nextStep = this.state.currentStep === 7
                ? 0 : this.state.currentStep + 1;
            this.setState({currentStep: nextStep});
        },

        toggleSound() {
            this.setState({
                on: !this.state.on
            });
        },
	startSequence() {
            this.clock = new Clock(8, 140);
	    this.clock.start(this.stepForward);
	    this.setState({started: true});
	},
	stopSequence() {
	    this.clock.stop();
	    this.setState({started: false});
	},
	startOrStop() {
	    if (!this.state.started) {
	        this.startSequence();
	    } else {
		this.stopSequence();
	    }
	} 
    });
    var StepColumn = React.createClass({
        render() {
            var buttons = [];
            for (var i = 7; i >= 0; i--) {
                buttons.push(<input type="radio"
                    data-note={i}
                    checked={i === this.props.note}
                    key={i}
                    onChange={this.handleChange.bind(this, i)}
                    />);
            }
            return (
                <div className={'StepColumn col-'
                    + this.props.step
                    + (this.props.active ? ' active' : '')}>
                    {buttons}
                </div>
            );
        },

        handleChange(note) {
            this.props.onNoteChange(this.props.step, note);
        }
    });

    React.render(<Synth />, document.getElementById('synth'));
}());
