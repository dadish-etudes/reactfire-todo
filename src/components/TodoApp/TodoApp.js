/**
 * TodoApp
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TodoApp.scss';
import TodoHeader from '../TodoHeader';
import MainSection from '../MainSection';
import TodoFooter from '../TodoFooter';
import TodoStore from '../../stores/TodoStore';
import TodoConstants from '../../constants/TodoConstants';

class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allTodos: TodoStore.getAll(),
      filterType: props.filter || TodoConstants.TODO_FILTER_ALL,
    };
    this._onChange = this._onChange.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentWillMount () {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    TodoStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({allTodos: TodoStore.getAll()});
  }

  setFilter (filterType) {
    this.setState({filterType: filterType});
  }

	render () {
		return(
			<section className={s.root}>
        <TodoHeader allTodos={this.state.allTodos} />
        <MainSection allTodos={this.state.allTodos} filterType={this.state.filterType} />
        <TodoFooter allTodos={this.state.allTodos} filterType={this.state.filterType} setFilter={this.setFilter} />
			</section>
		);
	}

}

export default withStyles(s)(TodoApp);
