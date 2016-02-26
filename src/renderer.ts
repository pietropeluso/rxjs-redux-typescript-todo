/// <reference path="./types" />

export function renderList(store: Redux.Store) {
  const view = document.getElementById('list');
  view.innerHTML = '';

  const state: AppState = store.getState();
  const filter = state.visibilityFilter;
  const list = getFilteredList(state.todos, filter);

  if (list.length) {
    list.forEach( item => {
      let li = document.createElement('li');
      li.className = item.completed ? 'list-item-completed' : 'list-item';
      li.setAttribute('data-id', item.id);
      li.innerText = item.text;

      let a = document.createElement('a');
      a.className = 'pull-right';

      let span = document.createElement('span');
      span.className = 'glyphicon glyphicon-trash';
      span.setAttribute('data-action', 'REMOVE_TODO');

      // appending the span element to the anchor tag
      a.appendChild(span);

      // appending the anchor to the LI element
      li.appendChild(a);

      view.appendChild(li);
    });
  }
};


function getFilteredList(list: TodoData[], filter: string) {
  if (filter === 'SHOW_ALL') {
    return list;
  }
  else {
    if (filter === 'SHOW_COMPLETED') {
      return list.filter( item => item.completed);
    }
    else {
      return list.filter( item => !item.completed);
    }
  }
}