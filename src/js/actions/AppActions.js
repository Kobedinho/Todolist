import React from 'react';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {
	create: function(text) {
		console.log('Actions :: ',AppConstants.TODO_CREATE);
	    AppDispatcher.dispatch({
	      	actionType: AppConstants.TODO_CREATE,
	      	text: text
	    });
	},
	updateText: function(id, text) {
		console.log('Actions :: ',AppConstants.TODO_UPDATE_TEXT);
	    AppDispatcher.dispatch({
		    actionType: AppConstants.TODO_UPDATE_TEXT,
		    id: id,
		    text: text
	    });
  	},
  	toggleComplete: function(todo) {
	    var id = todo.id;
	    var actionType = todo.complete ?
	        AppConstants.TODO_UNDO_COMPLETE :
	        AppConstants.TODO_COMPLETE;
	    console.log('Actions ::toggleComplete:: ',actionType);
	    AppDispatcher.dispatch({
	      	actionType: actionType,
	      	id: id
	    });
	},
	toggleCompleteAll: function() {
		console.log('Actions :: ',AppConstants.TODO_TOGGLE_COMPLETE_ALL);
	    AppDispatcher.dispatch({
	        actionType: AppConstants.TODO_TOGGLE_COMPLETE_ALL
	    });
	},
	destroy: function(id) {
		console.log('Actions :: ',AppConstants.TODO_DESTROY);
	    AppDispatcher.dispatch({
	      	actionType: AppConstants.TODO_DESTROY,
	      	id: id
	    });
	},
	destroyCompleted: function() {
		console.log('Actions :: ',AppConstants.TODO_DESTROY_COMPLETED);
	    AppDispatcher.dispatch({
	      	actionType: AppConstants.TODO_DESTROY_COMPLETED
	    });
	}
}
module.exports = AppActions;