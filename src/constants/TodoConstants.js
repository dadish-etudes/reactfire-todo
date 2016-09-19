
const TodoConstantsLabels = [
	'TODO_CREATE',
	'TODO_DESTROY',
	'TODO_UPDATE',
	'TODO_FILTER_ALL',
	'TODO_FILTER_COMPLETED',
	'TODO_FILTER_ACTIVE',
	'TODO_EDIT_ON',
	'TODO_EDIT_OFF',
	'TODO_STORE_CHANGE_EVENT',
	'TODO_LOCAL_STORAGE_KEY',
];

const TodoConstants = {};

TodoConstantsLabels.forEach(function (label, index) {
	TodoConstants[label] = label;
});

export default TodoConstants;