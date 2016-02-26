// TodoData type
type TodoData = {
  id: string,
  text: string,
  completed: boolean;
};

export function findIndexById(state: any = [], id: string) {
  let result = 0;
  state.forEach( (item: TodoData, index: number) => {
    if (item.id === id){
      result = index;
    }
  });
  return result;
};

export function removeElementById(state: any = [], index: number) {
  const len = state.length;
  return state.slice(0, index).concat(state.slice(index + 1, len));
};