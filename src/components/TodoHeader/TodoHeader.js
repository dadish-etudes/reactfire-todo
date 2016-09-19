/**
 * TodoHeader
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TodoHeader.scss';
import TodoActions from '../../actions/TodoActions';
import TodoTextInput from '../TodoTextInput';
import IconCheck from 'react-icons/lib/md/check';
import classNames from 'classnames';

class TodoHeader extends Component {

	constructor (props) {
		super(props);
		this.onSave = this.onSave.bind(this);
		this.toggleCompleteAll = this.toggleCompleteAll.bind(this);
		this.markAllTasksComplete = this.markAllTasksComplete.bind(this);
		this.markAllTasksIncomplete = this.markAllTasksIncomplete.bind(this);
	}

	onSave (text) {
		TodoActions.create(text);
	}

	getCompleteTasks () {
		return this.props.allTodos.filter(item => item.complete);
	}

	allTasksAreComplete () {
		if (!this.props.allTodos.length) return false;
		return this.props.allTodos.length === this.getCompleteTasks().length;
	}

	toggleCompleteAll () {
		if (this.allTasksAreComplete()) this.markAllTasksIncomplete();
		else this.markAllTasksComplete();
	}

	markAllTasksComplete () {
		this.props.allTodos.forEach(item => TodoActions.markComplete(item.id));
	}

	markAllTasksIncomplete () {
		this.props.allTodos.forEach(item => TodoActions.unmarkComplete(item.id));
	}

	render () {

		let iconCls = [s.icon];
		if (this.allTasksAreComplete()) iconCls.push(s.iconChecked);

		return(
			<section className={s.root}>
			<IconCheck className={classNames(iconCls)} onClick={this.toggleCompleteAll} />
				<TodoTextInput
					placeholder="What needs to be done?"
					onSave={this.onSave}
					autoFocus={true}
				/>
			</section>
		);
	}

}

export default withStyles(s)(TodoHeader);
