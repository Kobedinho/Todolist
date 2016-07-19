import React from 'react';

export default class TextInput extends React.Component {
	static propTypes = {
	    className: React.PropTypes.string,
	    id: React.PropTypes.string,
	    placeholder: React.PropTypes.string,
	    onSave: React.PropTypes.func.isRequired,
	    value: React.PropTypes.string
	}
	constructor(props) {
        super(props);
        this.ENTER_KEY_CODE = 13;
        this.state = {
      		value: this.props.value || ''
    	};
    	// binding event handler
    	this._save = this._save.bind(this);
    	this._onChange = this._onChange.bind(this);
    	this._onKeyDown = this._onKeyDown.bind(this);
    }
	render() /*object*/ {
	    return (
	      <input
	        className={this.props.className}
	        id={this.props.id}
	        placeholder={this.props.placeholder}
	        onBlur={this._save}
	        onChange={this._onChange}
	        onKeyDown={this._onKeyDown}
	        value={this.state.value}
	        autoFocus={true}
	      />
	    );
  	}
  	_save() {
  		// llamando a funcion onsave de item
	    this.props.onSave(this.state.value);
	    this.setState({
	      value: ''
	    });
  	}
  	_onChange(/*object*/ event) {
	    this.setState({
	      value: event.target.value
	    });
  	}
  	_onKeyDown(event) {
	    if (event.keyCode === this.ENTER_KEY_CODE) {
	      this._save();
	    }
  	}
}