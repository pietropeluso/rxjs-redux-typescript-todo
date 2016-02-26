export function getNodeFromEvent (event: Event, type: string) {
  let element: any;
  switch (type) {
    case 'element' :
      element = event.target as HTMLElement;
      break;
    case 'input' :
      element = event.target as HTMLInputElement;
      break;
  }
  return element;
};