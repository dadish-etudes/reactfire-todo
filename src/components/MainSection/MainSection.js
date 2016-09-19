/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MainSection.css';
import TodoItem from './TodoItem';
import TodoConstants from '../../constants/TodoConstants';

class MainSection extends Component {

	getFilteredTasks () {
		let filteredTodos = this.props.allTodos;
		if (this.props.filterType === TodoConstants.TODO_FILTER_COMPLETED) {
			filteredTodos = filteredTodos.filter(item => item.complete);
		} else if (this.props.filterType === TodoConstants.TODO_FILTER_ACTIVE) {
			filteredTodos = filteredTodos.filter(item => !item.complete);
		}
		return filteredTodos;
	}

	render () {
		let filteredTodos = this.getFilteredTasks();
		let todos = [];

		for (var key in filteredTodos) {
			todos.push(<TodoItem key={key} todo={filteredTodos[key]} />);
		}

	  return (
	    <section className={s.root}>
	    	<ul className={s.ul}>
	    		{todos}	
	    	</ul>
	    </section>
	  );
	}

}

export default withStyles(s)(MainSection);
