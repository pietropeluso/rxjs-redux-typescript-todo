/// <reference path="../typings/rx/rx.all.d.ts" />
/// <reference path="../typings/redux/redux.d.ts" />
/// <reference path="./types" />

import {createStore, combineReducers} from 'redux';
import {todos} from './reducers/todos';
import {visibilityFilter} from './reducers/visibilityFilter';
import {renderList} from './renderer';
import {getNodeFromEvent} from './utilities/getnode';

function typingStream() {
  let newId = 0;
  const newTodo = document.getElementById('newTodo');
  const subscription = Rx.Observable.fromEvent<KeyboardEvent>(newTodo, 'keydown')
    .filter( event => event.which === 13 )
    .do( event => event.preventDefault() )
    .map( event => {
      const node = getNodeFromEvent(event, 'input');
      const value = node.value;
      node.value = ''; // resetting the input box content to empty string
      return value;
    })
    .subscribe( value => {
      const index = (newId++).toString();
      // dispatch action providing the content of the input box
      store.dispatch({
        type: 'ADD_TODO',
        data: {
          id: index,
          text: value,
          completed: false
        }
      });
    });
}

function getOperationFromNode(event: MouseEvent, defaultAction: string):
  {id: string, action: string} {

  let node = <HTMLElement>event.target;
  let foundId: string = null;
  let foundAction: string = null;

  do { //climbing up the DOM to find the data-id of the element clicked (to toggle or remove it)
    foundId = node.getAttribute('data-id');
    if (!foundAction) foundAction = node.getAttribute('data-action');
    node = node.parentElement;
  }
  while ( !foundId && node != null );

  return {
    id: foundId,
    action: foundAction || defaultAction
  }
}

function clickingStream() {
  const todoList = document.getElementById('list');
  const subscription = Rx.Observable.fromEvent<MouseEvent>(todoList, 'click')
    .map( event => getOperationFromNode(event, 'TOGGLE_TODO'))
    .do( op => console.log(op))
    .filter( op => op.id != null )
    .subscribe( op => {
        store.dispatch({
          type: op.action,
          data: {
            id: op.id
          }
        })
      });

  return subscription;
}

function filteringStream() {
  const links = document.body.getElementsByClassName('show-filter');
  const subscription = Rx.Observable.fromEvent<MouseEvent>(links, 'click')
    .map ( event => {
      return getNodeFromEvent(event, 'element').getAttribute('data-action');
    })
    .subscribe( (action) => {
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: action
      });
    });

  return subscription;
}

/*const reducers = (state: any = {}, action: any): AppState => {
   return {
     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
     todos: todos(state.todos, action)
   }
};*/
const reducers = combineReducers({ todos, visibilityFilter });

const store = createStore(reducers);

store.subscribe( () => {
  // rendering the list
  renderList(store);
});

// register for keydown events on the input box
typingStream();

// register for visibility filter selection
filteringStream();

// register for click events on the todo list items
clickingStream();