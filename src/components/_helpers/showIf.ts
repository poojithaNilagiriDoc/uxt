export default function showIf(condition: any): null | any {
  return (result: () => any) => {
    if (!condition) return null;
    if (typeof result === 'function') return result();

    return result;
  };
}
