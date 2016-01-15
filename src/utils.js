import { isStream } from 'flyd';
import { stream as objStream } from 'flyd/module/obj';

const isPlainObject = (obj) => obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;

export function hasStream(obj) {
  return Object.keys(obj || {}).reduce((hasOne, key) => {
    if (hasOne) return hasOne;
    const val = obj[key];
    if (isStream(val)) return true;
    if (isPlainObject(val)) return hasStream(val);
    return hasOne;
  }, false);
}

function wrap(obj) {
  return isPlainObject(obj) && hasStream(obj) ? objStream(obj) : obj;
}

export function toStreams(props) {
  return Object.keys(props).reduce((acc, key) => ({...acc, [key]: wrap(props[key])}), {});
}
