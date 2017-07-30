import AppDispatcher from "../dispatcher";
import { PATTERN_NOTE_CHANGE } from "../constants";

export default {
  changeNote: function(step, note) {
    AppDispatcher.dispatch({
      actionType: PATTERN_NOTE_CHANGE,
      step: step,
      note: note
    });
  }
};
