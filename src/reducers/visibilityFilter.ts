/// <reference path="../types" />

export function visibilityFilter(state: string = 'SHOW_ALL', action: RouteAction): string {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER' :
      return action.filter
    default:
      return state;
  }
};