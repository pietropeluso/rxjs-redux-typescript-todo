/// <reference path="../types" />

import {findIndexById, removeElementById} from '../utilities/data-utilities';

type TodoAction = {
  type: string,
  data: TodoData
}

export function todos(state: TodoData[] = [], action: TodoAction) {
  switch (action.type) {
    case 'ADD_TODO' :
      return state.concat([ action.data ]);

    case 'TOGGLE_TODO' :
      return state.map( item => {
        if (item.id != action.data.id) {
          return item;
        }
        else {
          return (<any>Object).assign({}, item, {
            completed: !item.completed
          });
        }
      });

    case 'REMOVE_TODO' :
      const len = state.length;
      const index = findIndexById(state, action.data.id);
      const data = removeElementById(state, index);
      return data;

    default:
      return state;
  }
};