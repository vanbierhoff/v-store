export interface SerializerInterface {
    options: any;
    serialize: (value: any) => any;
    deserialize: (value: any) => any;
}
