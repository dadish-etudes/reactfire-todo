/**
 * TodoActions
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

class TodoActions {
	
	create (text) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	}

	destroy (id) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	}

	update (id, property, value) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_UPDATE,
			id: id,
			property: property,
			value: value
		});
	}

	markComplete (id) {
		this.update(id, 'complete', true);
	}

	unmarkComplete (id) {
		this.update(id, 'complete', false);
	}

	updateText (id, text) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_UPDATE,
			id: id,
			property: 'text',
			value: text
		});
	}

}

export default new TodoActions();
