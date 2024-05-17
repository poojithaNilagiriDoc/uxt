import showIf from './showIf';

export default function hideIf(condition: any): null | any {
  return showIf(!condition);
}
