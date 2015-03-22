import AppDispatcher from '../dispatcher/appdispatcher';
import SynthConstants from '../constants/constants';

export default {
	changeNote: function (step, note) {
		AppDispatcher.dispatch({
			actionType: SynthConstants.SYNTH_NOTE_CHANGE,
			step: step,
			note: note
		})
	}
}