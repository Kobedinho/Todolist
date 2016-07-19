import React from 'react';
import classNames from 'classnames';
import AppActions from '../actions/AppActions';
import TextInput from './TextInput';

export default class Item extends React.Component {
	static propTypes = {
	    todo: React.PropTypes.object.isRequired
	}
	constructor(props) {
        super(props);
        this.state = {isEditing: false};
        this._onToggleComplete = this._onToggleComplete.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onSave = this._onSave.bind(this);
        this._onDestroyClick = this._onDestroyClick.bind(this);
    }
	render() {
	    var todo = this.props.todo;

	    var input;
	    if (this.state.isEditing) {
	      input =
	        <TextInput
	          className="edit"
	          onSave={this._onSave}
	          value={todo.text}
	        />;
	    }
	    return (
	      	<li
	        	className={classNames({
	          	'completed': todo.complete,
	          	'editing': this.state.isEditing
	        	})}
	        	key={todo.id}>
	        	<div className="view">
	          		<input
	            	className="toggle"
	            	type="checkbox"
	            	checked={todo.complete}
	            	onChange={this._onToggleComplete}
	          		/>
	          		<label onDoubleClick={this._onDoubleClick}>
	            	{todo.text}
	          		</label>
	          		<button className="destroy" onClick={this._onDestroyClick} />
	        	</div>
	        	{input}
	      	</li>
	    );
	}
  	_onToggleComplete() {
    	AppActions.toggleComplete(this.props.todo);
  	}
  	_onDoubleClick() {
    	this.setState({isEditing: true});
  	}
  	_onSave(text) {
    	AppActions.updateText(this.props.todo.id, text);
    	this.setState({isEditing: false});
  	}
  	_onDestroyClick() {
    	AppActions.destroy(this.props.todo.id);
  	}
}