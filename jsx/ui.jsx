(function(Clock, SynthEngine, window) {
    'use strict';
    var aMinorNotes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440];

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
    
}(this.RS.Clock, this.RS.Synth, this));
