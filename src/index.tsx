import { NativeModules, Platform } from 'react-native';

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

const LINKING_ERROR =
  `The package 'react-native-mk-localsearch' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const MkLocalsearch = NativeModules.MkLocalsearch
  ? NativeModules.MkLocalsearch
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

export function multiply(a: number, b: number): Promise<number> {
  return MkLocalsearch.multiply(a, b);
}

export function search(query: string, region: Region): Promise<MapItem[]> {
  return new Promise<MapItem[]>((resolve, reject) => {
    MkLocalsearch.search(query, region)
      .then((results: any) => {
        resolve(results || []);
      })
      .catch(reject);
  });
}

export default {
  search,
};
