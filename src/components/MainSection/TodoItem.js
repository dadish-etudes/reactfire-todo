/**
 * TodoItem
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import s from './TodoItem.scss';
import TodoActions from '../../actions/TodoActions';
import TodoConstants from '../../constants/TodoConstants';
import TodoTextInput from '../TodoTextInput';
import IconCheck from 'react-icons/lib/md/check';
import IconCheckBox from 'react-icons/lib/md/check-box-outline-blank';
import IconDelete from 'react-icons/lib/md/delete';

const ESC_KEY_CODE = 27;

class TodoItem extends Component {

	constructor (props) {
		super(props);
		this._onDestroyClick = this._onDestroyClick.bind(this);
		this._toggleComplete = this._toggleComplete.bind(this);
		this._updateText = this._updateText.bind(this);
		this._turnOnEditMode = this._turnOnEditMode.bind(this);
		this._turnOffEditMode = this._turnOffEditMode.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this.state = {
			editMode: TodoConstants.TODO_EDIT_OFF
		};
	}

	static propTypes = {
		todo: PropTypes.object.isRequired
	};

	_toggleComplete () {
		if (this.props.todo.complete) {
			TodoActions.unmarkComplete(this.props.todo.id);
		} else {
			TodoActions.markComplete(this.props.todo.id);
		}
	}

	_onDestroyClick () {
		TodoActions.destroy(this.props.todo.id);
	}

	_updateText (text) {
		this._turnOffEditMode();
		if (!text.trim()) return this._onDestroyClick();
		TodoActions.updateText(this.props.todo.id, text);
	}

	_turnOnEditMode () {
		this.setState({editMode: TodoConstants.TODO_EDIT_ON});
	}

	_turnOffEditMode () {
		this.setState({editMode: TodoConstants.TODO_EDIT_OFF});
	}

	_onKeyDown (ev) {
		if (ev.keyCode === ESC_KEY_CODE) {
			this._turnOffEditMode();
		}
	}

	render () {
		let todo = this.props.todo;
		let icon, todoBody;
		if (todo.complete) {
			icon = <IconCheck className={classNames(s.icon, s.check)} onClick={this._toggleComplete}/>;
		} else {
			icon = <IconCheckBox className={classNames(s.icon, s.checkBox)} onClick={this._toggleComplete}/>
		}

		if (this.state.editMode === TodoConstants.TODO_EDIT_ON) {
			todoBody = (
				<TodoTextInput 
					autoFocus={true} 
					onSave={this._updateText} 
					todoItem={true}
					value={todo.text}
				>
					{icon}
				</TodoTextInput>
			);
		} else {
			todoBody = (
				<label className={s.label} onDoubleClick={this._turnOnEditMode}>
					{icon}
					{todo.text}
					<IconDelete className={s.delete} onClick={this._onDestroyClick} />
				</label>		
			);			
		}

		return (
			<li className={s.root} key={todo.id} onKeyDown={this._onKeyDown}>				
				{todoBody}
			</li>	
		);
	}
}

export default withStyles(s)(TodoItem);
