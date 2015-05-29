import R from 'ramda';
import {throws, arrayify} from '../utils';

const eitherPath = R.ifElse(R.is(String), R.split('.'), R.ifElse(R.isArrayLike, R.identity, throws('Can only project using strings or arrays')));

function projectOntoInternal(from, path, to){
  return R.assocPath(path, R.path(path, from), to);
}

const projectOnto = R.curryN(3, function(from, path, to){
  return projectOntoInternal(from, eitherPath(path), to);
});

export const projectAll = R.curryN(2, function(from, paths){
  return R.is(Function, paths) ?
          paths(from)
        : R.transduce(R.map(projectOnto(from)), R.flip(R.call), {}, arrayify(paths));
});
