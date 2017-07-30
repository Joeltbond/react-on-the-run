import React from 'react';
import Clock from '../clock';
import TransportActions from '../actions/transportactions';
import TransportStore from '../stores/transportstore';

function getStateFromStore() {
  return {
    started: TransportStore.isSequenceStarted()
  };
}

export default class Transport extends React.Component {
  constructor() {
    super();
    this.state = getStateFromStore();
  }

  render() {
    return (
      <div className="transport">
        <button onClick={this.startOrStop.bind(this)}>
          {this.state.started ? 'stop' : 'start'}
        </button>
      </div>
    );
  }

  componentWillMount() {
    TransportStore.addChangeListener(this.onTransportChange.bind(this));
  }

  onTransportChange() {
    this.setState(getStateFromStore());
  }

  startSequence() {
    TransportActions.startTransport();
  }

  stopSequence() {
    TransportActions.stopTransport();
  }

  startOrStop() {
    if (!this.state.started) {
      this.startSequence.bind(this)();
    } else {
      this.stopSequence.bind(this)();
    }
  }
}
