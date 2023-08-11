"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.multiply = multiply;
exports.search = search;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-mk-localsearch' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const MkLocalsearch = _reactNative.NativeModules.MkLocalsearch ? _reactNative.NativeModules.MkLocalsearch : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function multiply(a, b) {
  return MkLocalsearch.multiply(a, b);
}
function search(query, region) {
  return new Promise((resolve, reject) => {
    MkLocalsearch.search(query, region).then(results => {
      resolve(results || []);
    }).catch(reject);
  });
}
var _default = {
  search
};
exports.default = _default;
//# sourceMappingURL=index.js.map