import React from 'react';
import Clock from '../clock';
import SynthEngine from '../synth';
import StepColumn from './stepcolumn';

var aMinorNotes = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440];

export default class Sequencer extends React.Component {
    constructor() {
        super();
        this.state =  {
            pattern: [0, 1, 2, 3, 4, 5, 6, 7],
            currentStep: 0,
            on: false,
            started: false
        }
    }

    render() {
        var columns = [];

        this.state.pattern.forEach((note, index) => {
            columns.push(<StepColumn
                note={note}
                step={index}
                key={index}
                onNoteChange={this.handleNoteChange.bind(this)}
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
                    <button onClick = {this.toggleSound.bind(this)}>{
                        this.state.on ? 'off' : 'on'
                    }</button>
                    <button onClick = {this.stepForward.bind(this)}>Step</button>
                    <button onClick = {this.startOrStop.bind(this)}>{
                        this.state.started ? 'stop' : 'start'
                    }</button>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.synth = new SynthEngine();
    }

    handleNoteChange(step, note) {
        var pattern = this.state.pattern.slice();
        pattern[step] = note;
        this.setState({
            pattern: pattern
        });
    }

    stepForward() {
        var nextStep = this.state.currentStep === 7
            ? 0 : this.state.currentStep + 1;
        this.setState({currentStep: nextStep});
    }

    toggleSound() {
        this.setState({
            on: !this.state.on
        });
    }

    startSequence() {
        this.clock = new Clock(8, 140);
        this.clock.start(this.stepForward.bind(this));
        this.setState({started: true});
    }

    stopSequence() {
        this.clock.stop();
        this.setState({started: false});
    }

    startOrStop() {
        if (!this.state.started) {
            this.startSequence();
        } else {
            this.stopSequence();
        }
    } 
}
