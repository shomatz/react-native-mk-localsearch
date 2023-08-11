export type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};
export type MapItem = {
    title: string;
    subtitle: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    name: string;
    url: string;
};
export declare function multiply(a: number, b: number): Promise<number>;
export declare function search(query: string, region: Region): Promise<MapItem[]>;
declare const _default: {
    search: typeof search;
};
export default _default;
//# sourceMappingURL=index.d.ts.map