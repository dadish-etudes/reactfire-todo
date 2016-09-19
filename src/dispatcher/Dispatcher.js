let _callbacks = [];
let _promises = [];

class Dispatcher {

	register (callback) {
		_callbacks.push(callback);
		return _callbacks.length - 1; // index
	}

	dispatch (payload) {
		_callbacks.forEach(function (callback) {
			callback(payload);
		});
	}

};

export default Dispatcher;
