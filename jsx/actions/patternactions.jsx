import AppDispatcher from '../dispatcher/appdispatcher';
import Constants from '../constants/constants';

export default {
	changeNote: function (step, note) {
		AppDispatcher.dispatch({
			actionType: Constants.PATTERN_NOTE_CHANGE,
			step: step,
			note: note
		})
	}
}