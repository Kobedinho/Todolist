var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {
	// Hand waving here -- not showing how this interacts with XHR or persistent
	// server-side storage.
	// Using the current timestamp + random number in place of a real id.
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	  _todos[id] = {
	    id: id,
	    complete: false,
	    text: text
	};
}

function update(id, updates) {
	_todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
	for (var id in _todos) {
    	update(id, updates);
	}
}

function destroy(id) {
	delete _todos[id];
}

function destroyCompleted() {
	for (var id in _todos) {
    	if (_todos[id].complete) {
      		destroy(id);
    	}
  	}
}



var AppStore = assign({}, EventEmitter.prototype, {

	areAllComplete: function() {
	    for (var id in _todos) {
	      	if (!_todos[id].complete) {
	        	return false;
	      	}
	    }
	    return true;
  	},

  	getAll: function() {
	    return _todos;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
	var text;
	switch(action.actionType) {
	    case AppConstants.TODO_CREATE:
	      text = action.text.trim();
	      if (text !== '') {
	        create(text);
	        AppStore.emitChange();
	      }
	      break;

	    case AppConstants.TODO_TOGGLE_COMPLETE_ALL:
	      if (AppStore.areAllComplete()) {
	        updateAll({complete: false});
	      } else {
	        updateAll({complete: true});
	      }
	      AppStore.emitChange();
	      break;

	    case AppConstants.TODO_UNDO_COMPLETE:
	      update(action.id, {complete: false});
	      AppStore.emitChange();
	      break;

	    case AppConstants.TODO_COMPLETE:
	      update(action.id, {complete: true});
	      AppStore.emitChange();
	      break;

	    case AppConstants.TODO_UPDATE_TEXT:
	      text = action.text.trim();
	      if (text !== '') {
	        update(action.id, {text: text});
	        AppStore.emitChange();
	      }
	      break;

	    case AppConstants.TODO_DESTROY:
	      destroy(action.id);
	      AppStore.emitChange();
	      break;

	    case AppConstants.TODO_DESTROY_COMPLETED:
	      destroyCompleted();
	      AppStore.emitChange();
	      break;

	    default:
	      // no op
  	}
});

module.exports  = AppStore;