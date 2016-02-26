// TodoData type
interface TodoData {
  id: string;
  text: string;
  completed: boolean;
}

interface AppState {
  visibilityFilter: string;
  todos: TodoData[];
}

interface RouteAction {
  type: string;
  filter: string;
}
