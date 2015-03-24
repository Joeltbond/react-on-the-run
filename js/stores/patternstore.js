import AppDispatcher from '../dispatcher/appdispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';
import assign from 'object-assign';

let CHANGE_EVENT = 'change';

let pattern = [0, 1, 2, 3, 4, 5, 6, 7];

/**
 * change a note at a given index
 * @param  {number} index
 * @param  {number} note value to update the step with (0-7)
 */
function changeNote(step, note) {
	pattern[step] = note;
}

let PatternStore = assign({}, EventEmitter.prototype, {
	getPattern: function () {
		return pattern;
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
	if (action.actionType === Constants.PATTERN_NOTE_CHANGE) {
		changeNote(action.step, action.note);
		PatternStore.emitChange();
	}
});

export default PatternStore;