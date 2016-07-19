import Header from './Header';
import Footer from './Footer';
import MainSection from './MainSection';
import React from 'react';
import AppStore from '../store/AppStore';

export default class Todo extends React.Component {
	constructor(props) {
        super(props);
        this.state = this.getTodoState();
        this._onChange = this._onChange.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getTodoState() {
	  	return {
	    	allTodos: AppStore.getAll(),
	    	areAllComplete: AppStore.areAllComplete()
	  	};
	}
	componentDidMount() {
    	AppStore.addChangeListener(this._onChange);
  	}
	componentWillUnmount() {
    	AppStore.removeChangeListener(this._onChange);
  	}
  	render() {
	    return (
		    <div>
		        <Header />
		        <MainSection
		          allTodos={this.state.allTodos}
		          areAllComplete={this.state.areAllComplete}
		        />
		        <Footer allTodos={this.state.allTodos} />
		    </div>
	    );
  	}
  	_onChange() {
    	this.setState(this.getTodoState());
  	}
}