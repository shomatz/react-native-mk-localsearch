import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-mk-localsearch' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const MkLocalsearch = NativeModules.MkLocalsearch ? NativeModules.MkLocalsearch : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function multiply(a, b) {
  return MkLocalsearch.multiply(a, b);
}
export function search(query, region) {
  return new Promise((resolve, reject) => {
    MkLocalsearch.search(query, region).then(results => {
      resolve(results || []);
    }).catch(reject);
  });
}
//# sourceMappingURL=index.js.map