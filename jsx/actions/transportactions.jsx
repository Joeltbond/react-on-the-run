import AppDispatcher from '../dispatcher/appdispatcher';
import Constants from '../constants/constants';

export default {
	startTransport: function () {
		AppDispatcher.dispatch({
			actionType: Constants.TRANSPORT_START
		})
	},
	stopTransport: function () {
		AppDispatcher.dispatch({
			actionType: Constants.TRANSPORT_STOP
		})
	},
	stepTransport: function () {
		AppDispatcher.dispatch({
			actionType: Constants.TRANSPORT_STEP
		})
	}
}