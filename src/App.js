import React, { Component } from "react";
import SynthEngine from "./synth";
import StepColumn from "./components/StepColumn";
import Transport from "./components/Transport";
import PatternStore from "./stores/patternstore";
import TransportStore from "./stores/transportstore";
import "./App.css";

function getStateFromStores() {
  return {
    pattern: PatternStore.getPattern(),
    currentStep: TransportStore.getCurrentStep(),
    started: TransportStore.isSequenceStarted()
  };
}

export default class Sequencer extends Component {
  constructor() {
    super();
    this.state = getStateFromStores();
  }

  render() {
    var columns = [];

    this.state.pattern.forEach((note, index) => {
      columns.push(
        <StepColumn
          note={note}
          step={index}
          key={index}
          active={index === this.state.currentStep && this.state.started}
        />
      );
    });

    // For now the sound itself is triggered from this sequencer component
    // itself. In the future this should probably be abstracted to a
    // class that is separate from the UI.
    if (this.state.started) {
      this.synth.playNote(this.state.pattern[this.state.currentStep]);
    } else {
      this.synth.stopLastNote();
    }

    return (
      <div className="Sequencer">
        <div className="steps-wrapper">
          {columns}
        </div>
        <Transport />
      </div>
    );
  }

  componentWillMount() {
    this.synth = new SynthEngine();
    PatternStore.addChangeListener(this.onPatternChange.bind(this));
    TransportStore.addChangeListener(this.onTransportChange.bind(this));
  }

  onPatternChange() {
    this.setState({
      pattern: PatternStore.getPattern()
    });
  }

  onTransportChange() {
    this.setState({
      currentStep: TransportStore.getCurrentStep(),
      started: TransportStore.isSequenceStarted()
    });
  }
}
