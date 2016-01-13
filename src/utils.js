import { isStream } from 'flyd';

const isPlainObject = (obj) => typeof obj === 'object' && obj.constructor === Object;

export function hasStream(obj) {
  return Object.keys(obj || {}).reduce((hasOne, key) => {
    if (hasOne) return hasOne;
    const val = obj[key];
    if (isStream(val)) return true;
    if (isPlainObject(val)) return hasStream(val);
    return hasOne;
  }, false);
}
