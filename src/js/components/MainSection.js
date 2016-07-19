import React from 'react';
import AppActions from '../actions/AppActions';
import Item from './Item';

export default class MainSection extends React.Component {
	let propTypes = {
	    allTodos: React.PropTypes.object.isRequired,
	    areAllComplete: React.PropTypes.bool.isRequired
	}
	constructor(props) {
        super(props);
		this._onToggleCompleteAll = this._onToggleCompleteAll.bind(this);
    }
	render() {
	    // This section should be hidden by default
	    // and shown when there are todos.
	    if (Object.keys(this.props.allTodos).length < 1) {
	      	return null;
	    }

	    var allTodos = this.props.allTodos;
	    var todos = [];

	    for (var key in allTodos) {
	      	todos.push(<Item key={key} todo={allTodos[key]} />);
	    }

	    return (
	      	<section id="main">
	        	<input
		          id="toggle-all"
		          type="checkbox"
		          onChange={this._onToggleCompleteAll}
		          checked={this.props.areAllComplete ? 'checked' : ''}
	        	/>
		        <label htmlFor="toggle-all">Mark all as complete</label>
		        <ul id="todo-list">{todos}</ul>
	      	</section>
	    );
  	}
  	_onToggleCompleteAll() {
    	AppActions.toggleCompleteAll();
  	}
}