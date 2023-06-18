const constructor = 'constructor';

export function getMetadata<T = any>(key: string, target: object): T | undefined {
  const data = Reflect.getMetadata(key, target?.constructor || target);
  if (data) {
    return data;
  }
  return Reflect.getMetadata(key, target);
}
