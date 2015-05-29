
export function throws(message){
  return () => {
    throw new Error(message || 'There was an error');
  };
}

export function arrayify(possibleArray){
  return Array.isArray(possibleArray) ? possibleArray : [possibleArray];
}
