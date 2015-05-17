import flyd from 'flyd';

export function isFunction(fn){
  return typeof fn === 'function';
}

export function isPlainObject(obj) {
  return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
}

export function mapValues(fn, obj){
  var newObj = {};
  Object.keys(obj).forEach((key) => newObj[key] = fn(obj[key], key));
  return newObj;
}

export function serialize(stores){
  return mapValues((value) => {
    if(isPlainObject(value)){
      return serialize(value);
    }
    else if(flyd.isStream(value)){
      return value();
    }
  }, stores);
}

export function throws(message){
  return () => {
    throw new Error(message);
  };
}

export function arrayify(possibleArray){
  return Array.isArray(possibleArray) ? possibleArray : [possibleArray];
}
