/**
 * TodoFooter
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TodoFooter.scss';
import classNames from 'classnames';
import TodoActions from '../../actions/TodoActions';
import TodoConstants from '../../constants/TodoConstants';
import history from '../../core/history';

const PATH_ALL = '/';
const PATH_ACTIVE = '/active/';
const PATH_COMPLETED = '/completed/';

class TodoFooter extends Component {

	constructor (props) {
		super(props);
		this.getCompleteTasks = this.getCompleteTasks.bind(this);
		this.incompleteTaskCount = this.incompleteTaskCount.bind(this);
		this.deleteCompleteTasks = this.deleteCompleteTasks.bind(this);
		this.filterAll = this.filterAll.bind(this);
		this.filterActive = this.filterActive.bind(this);
		this.filterCompleted = this.filterCompleted.bind(this);
		this.onLocationChange = this.onLocationChange.bind(this);
		history.listen(this.onLocationChange);
	}

	deleteCompleteTasks () {
		this.getCompleteTasks().forEach(item => TodoActions.destroy(item.id));
	}

	getCompleteTasks () {
		return this.props.allTodos.filter(item => item.complete);
	}

	incompleteTaskCount () {
		return this.props.allTodos.length - this.getCompleteTasks().length;
	}

	filterAll () {
		history.push(PATH_ALL);
	}

	filterActive () {
		history.push(PATH_ACTIVE);
	}

	filterCompleted () {
		history.push(PATH_COMPLETED);
	}

	onLocationChange (event) {
		let path = event.pathname;
		let filter;
		if (path === PATH_ALL) {
			filter = TodoConstants.TODO_FILTER_ALL;
		} else if (path === PATH_ACTIVE) {
			filter = TodoConstants.TODO_FILTER_ACTIVE;
		} else if (path === PATH_COMPLETED) {
			filter = TodoConstants.TODO_FILTER_COMPLETED;
		} else {
			filter = false;
		}
		if (!filter) return;
		this.props.setFilter(filter);
	}

	render () {
		let incompleteTaskCount = this.incompleteTaskCount();

		let AllCls = [s.filterItem];
		if (this.props.filterType === TodoConstants.TODO_FILTER_ALL) {
			AllCls.push(s.active);
		}

		let ActiveCls = [s.filterItem];
		if (this.props.filterType === TodoConstants.TODO_FILTER_ACTIVE) {
			ActiveCls.push(s.active);
		}

		let CompletedCls = [s.filterItem];
		if (this.props.filterType === TodoConstants.TODO_FILTER_COMPLETED) {
			CompletedCls.push(s.active);
		}

		return(
			<section className={this.props.allTodos.length ? s.root : s.hidden}>
				<div className={s.left}>
					{incompleteTaskCount} item{incompleteTaskCount === 1 ? '' : 's'} left
				</div>
				
				<div className={s.filter}>
					<div className={classNames(AllCls)} onClick={this.filterAll}>All</div>
					<div className={classNames(ActiveCls)} onClick={this.filterActive}>Active</div>
					<div className={classNames(CompletedCls)} onClick={this.filterCompleted}>Completed</div>
				</div>
				
				<div className={s.delete} onClick={this.deleteCompleteTasks}>
					Clear completed
				</div>
			</section>
		);
	}

}

export default withStyles(s)(TodoFooter);
