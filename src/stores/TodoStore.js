import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import TodoConstants from '../constants/TodoConstants';
import TodoLocalStore from './TodoLocalStore';

const CHANGE_EVENT = TodoConstants.TODO_STORE_CHANGE_EVENT;

const _todos = TodoLocalStore.get();

function create(text) {
	let id = Date.now();
	_todos.push({
		id: id,
		text: text,
		complete: false
	});
}

function destroy(id) {
	let found, index;
	found = _todos.find(function (item, i) {
		if(item.id === id) {
			index = i;
			return true;
		}
		return false;
	});
	if (!!found) {
		_todos.splice(index, 1);
	}
}

function update(id, property, value) {
	let item = _todos.find(item => item.id === id);
	item[property] = value;
}

function updateLocalStore () {
	TodoLocalStore.set(_todos);
}

class TodoStore extends EventEmitter {

	constructor () {
		super();
		this.changeEventHandler = this.changeEventHandler.bind(this);
		this.dispatcherIndex = AppDispatcher.register(this.changeEventHandler);
	}
	
	getAll () {
		return _todos;
	}

	emitChange () {
		this.emit(CHANGE_EVENT);
		updateLocalStore();
	}

	addChangeListener (callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	changeEventHandler (payload) {
		let action = payload.action;
		switch(action.actionType) {
			
			case TodoConstants.TODO_CREATE:
				let text = action.text.trim();
				if(text !== '') {
					create(text);
					this.emitChange();
				}
				break;

			case TodoConstants.TODO_DESTROY:
				destroy(action.id);
				this.emitChange();
				break;

			case TodoConstants.TODO_UPDATE:
				update(action.id, action.property, action.value);
				this.emitChange();
				break;

		}

		return true;
	}
}

export default new TodoStore();
