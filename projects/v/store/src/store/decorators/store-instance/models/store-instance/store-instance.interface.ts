export interface StoreInstanceInterface {
  key: string | symbol;
  serializer?: <T>(data: any, options: any) => T;
}
