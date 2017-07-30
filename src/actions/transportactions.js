import AppDispatcher from "../dispatcher";
import { TRANSPORT_START, TRANSPORT_STOP, TRANSPORT_STEP } from "../constants";

export default {
  startTransport: function() {
    AppDispatcher.dispatch({
      actionType: TRANSPORT_START
    });
  },
  stopTransport: function() {
    AppDispatcher.dispatch({
      actionType: TRANSPORT_STOP
    });
  },
  stepTransport: function() {
    AppDispatcher.dispatch({
      actionType: TRANSPORT_STEP
    });
  }
};
