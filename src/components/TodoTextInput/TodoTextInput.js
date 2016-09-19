/**
 * TodoTextInput
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TodoTextInput.scss';

const ENTER_KEY_CODE = 13;

class TodoTextInput extends Component {

	constructor (props) {
		super(props);
		this.state = {};
		this.state.value = this.props.value || '';

		// bind the methods
		this._save = this._save.bind(this);
		this._saveOnBlur = this._saveOnBlur.bind(this);
		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
	}

	static propTypes = {
		id: PropTypes.string,
		placeholder: PropTypes.string,
		onBlur: PropTypes.bool,
		onSave: PropTypes.func.isRequired,
		autoFocus: PropTypes.bool,
		value: PropTypes.string
	};

	_save () {
		this.props.onSave(this.state.value);
		if (this.props.todoItem) return;
		this.setState({
			value: ''
		});
	}

	_onChange (ev) {
		this.setState({
			value: ev.target.value
		});
	}

	_onKeyDown (ev) {
		if (ev.keyCode === ENTER_KEY_CODE) {
			this._save();
		}
	}

	_saveOnBlur () {
		if (!this.props.todoItem) return;
		this._save();
	}

	render () {
		return(
			<input
				className={s.root}
				type="text"
				placeholder={this.props.placeholder}
				onBlur={this._saveOnBlur}
				onChange={this._onChange}
				onKeyDown={this._onKeyDown}
				value={this.state.value}
				autoFocus={this.props.autoFocus}
			/>
		);
	}

}

export default withStyles(s)(TodoTextInput);
