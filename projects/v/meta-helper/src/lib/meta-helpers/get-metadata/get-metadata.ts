const constructor = 'constructor';

export function getMetadata(key: string, target: object) {
  const data = Reflect.getMetadata(key, target?.constructor || target);
  if (data) {
    return data;
  }
  return Reflect.getMetadata(key, target);
}
