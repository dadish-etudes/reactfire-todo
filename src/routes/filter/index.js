/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React from 'react';
import Filter from './filter';
import TodoConstants from '../../constants/TodoConstants';

export default {

  path: '/:filter',
  action (context) {
  	let filter;
  	
  	switch (context.params.filter) {
  		case 'active':
  			filter = TodoConstants.TODO_FILTER_ACTIVE;
  			break;

  		case 'completed':
  			filter = TodoConstants.TODO_FILTER_COMPLETED;
  			break;

  		default:
  			break;
  	}

    return <Filter filter={filter} />;
  },
  
};
