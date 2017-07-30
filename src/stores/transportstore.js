import AppDispatcher from "../dispatcher";
import { EventEmitter } from "events";
import Clock from "../clock";
import { TRANSPORT_START, TRANSPORT_STOP, TRANSPORT_STEP } from "../constants";
import TransportActions from "../actions/transportactions";

let CHANGE_EVENT = "change";

let currentStep = 0;
let sequenceStarted = false;
var clock;

/**
 * increment the current step in the sequence
 * if we hit the end we go back to 0
 */
function stepForward() {
  let shouldRestart = currentStep === 7;
  currentStep = shouldRestart ? 0 : currentStep + 1;
}

function startSequence() {
  sequenceStarted = true;
  clock = new Clock(16, 140);
  clock.start(TransportActions.stepTransport);
}

function stopSequence() {
  sequenceStarted = false;
  clock.stop();
}

function resetSequence() {
  currentStep = 0;
}

var TransportStore = Object.assign({}, EventEmitter.prototype, {
  getCurrentStep: function() {
    return currentStep;
  },

  isSequenceStarted: function() {
    return sequenceStarted;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case TRANSPORT_START:
      startSequence();
      TransportStore.emitChange();
      break;

    case TRANSPORT_STOP:
      stopSequence();
      TransportStore.emitChange();
      resetSequence();
      break;

    case TRANSPORT_STEP:
      stepForward();
      TransportStore.emitChange();
      break;

    default:
    //no op
  }
});

export default TransportStore;
