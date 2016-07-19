import React from 'react';
import AppActions from '../actions/AppActions';
import TextInput from './TextInput';

export default class Header extends React.Component {

	render() {
	    return (
	      	<header id="header">
	        	<h1>todos</h1>
	        	<TextInput
	          		id="new-todo"
	          		placeholder="What needs to be done?"
	          		onSave={this._onSave}
	        	/>
	      	</header>
	    );
  	}
  	_onSave(text) {
    	if (text.trim()){
      		AppActions.create(text);
    	}
  	}
}