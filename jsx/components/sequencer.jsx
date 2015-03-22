import React from 'react';
import Clock from '../clock';
import SynthEngine from '../synth';
import StepColumn from './stepcolumn';
import SynthStore from '../stores/synthstore';
import TransportStore from '../stores/transportstore';

function getStateFromStores() {
    return {
        pattern: SynthStore.getSequence(),
        currentStep: TransportStore.getCurrentStep(),
        started: TransportStore.isSequenceStarted()
    }
}

export default class Sequencer extends React.Component {
    constructor() {
        super();
        this.state = getStateFromStores();
    }

    render() {
        var columns = [];

        this.state.pattern.forEach((note, index) => {
            columns.push(<StepColumn
                note={note}
                step={index}
                key={index}
                active={index === this.state.currentStep &&
                    this.state.started}
                />);
        });

        if (this.synth) {
            if (this.state.started) {
                this.synth.playNote(this.state.pattern[this.state.currentStep]);
            } else {
                this.synth.stopLastNote();
            }
        }

        return (
            <div className="Sequencer">
                <div className="steps-wrapper">
                    {columns}
                </div>
                <div className="transport">
                    <button onClick = {this.startOrStop.bind(this)}>{
                        this.state.started ? 'stop' : 'start'
                    }</button>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.synth = new SynthEngine();
        SynthStore.addChangeListener(this.onSequenceChange.bind(this));
    }

    onSequenceChange() {
        this.setState({
            pattern: SynthStore.getSequence()
        })
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

    startSequence() {
        this.clock = new Clock(8, 140);
        this.clock.start(this.stepForward.bind(this));
        this.setState({started: true});
    }

    stopSequence() {
        this.clock.stop();
        this.setState({started: false, currentStep: 0 });
    }

    startOrStop() {
        if (!this.state.started) {
            this.startSequence();
        } else {
            this.stopSequence();
        }
    }
}
