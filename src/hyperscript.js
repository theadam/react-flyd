import { isStream, combine } from 'flyd';
import { createElement, isValidElement } from 'react';
import { reactive } from 'react-flyd-class';

function hasStream(obj) {
  return Object.keys(obj).some(key => isStream(obj[key]));
}

function wrapChildren(children) {
  const notValidElement$s = children.filter(child => isStream(child) && !isValidElement(child()));
  if (notValidElement$s.length > 0) {
    return [combine(() => {
      return children.map(child => {
        if (!isStream(child)) {
          return child;
        }
        if (notValidElement$s.indexOf(child) > -1) {
          return child();
        }
        return createElement(reactive(), {}, child);
      });
    }, notValidElement$s)];
  }
  return children.map(child => {
    if (!isStream(child)) {
      return child;
    }
    return createElement(reactive(), {}, child);
  });
}

export function h(tag, props, ...children) {
  let defaultProps = props || {};
  let wrappedChildren = wrapChildren(children);
  if (hasStream(defaultProps) || hasStream(wrappedChildren)) {
    return createElement(reactive(tag), defaultProps, ...wrappedChildren);
  }
  return createElement(tag, defaultProps, ...wrappedChildren);
}
