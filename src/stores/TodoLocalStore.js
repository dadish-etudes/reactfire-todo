/**
 * TodoLocalStorage
 */

import TodoConstants from '../constants/TodoConstants';

let store = null;

function storageAvailable() {
	try {
		var storage = window.localStorage,
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

function getTodos () {
	return JSON.parse(store.getItem(TodoConstants.TODO_LOCAL_STORAGE_KEY) || '[]');
}

function setTodos (todos) {
	store.setItem(TodoConstants.TODO_LOCAL_STORAGE_KEY, JSON.stringify(todos));
	return getTodos();
}

function initStore() {
	store = window.localStorage;
	let todos = getTodos();
	setTodos(todos);
}

function emptyTodoFunction () { return []; }

class TodoLocalStore {

	constructor () {
		if (storageAvailable()) {
			this.get = this.get.bind(this);
			this.set = this.set.bind(this);
			initStore();
		} else {
			this.get = emptyTodoFunction;
			this.set = emptyTodoFunction;			
		}
	}

	get () {
		return getTodos();
	}

	set (todos) {
		return setTodos(todos);
	}

}

export default new TodoLocalStore();