import AppDispatcher from '../dispatcher/appdispatcher';
import {EventEmitter} from 'events';
import SynthConstants from '../constants/constants';
import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let currentStep = 0;
let sequenceStarted = false;

/**
 * increment the current step in the sequence
 * if we hit the end we go back to 0
 */
function stepForward() {
	let shouldRestart = currentStep === 7;
	currentStep = shouldRestart ? 0 : currentStep + 1;
}

export default assign({}, EventEmitter.prototype, {
	getCurrentStep: function () {
		return currentStep;
	},

	isSequenceStarted: function () {
		return sequenceStarted;
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case SynthConstants.SYNTH_STEP:
		stepForward();
		break;

		case SynthConstants.SYNTH_START:
	    startSequence();
	    break;

	    case SynthConstants.SYNTH_STOP:
	    stopSequence();
	    break;

		default:
		//no op
	}
});