import { isStream, combine } from 'flyd';
import { createElement, isValidElement } from 'react';
import { reactive } from 'react-flyd-class';

import { hasStream, toStreams } from './utils';

function wrapChildren(children) {
  const notValidElement$s = children.filter(child => isStream(child) && !isValidElement(child()));
  if (notValidElement$s.length > 0) {
    return [combine(() => {
      return children.map(child => {
        let element;
        if (!isStream(child)) {
          element = child;
        } else if (notValidElement$s.indexOf(child) > -1) {
          element = child();
        } else {
          element = createElement(reactive(), {}, child);
        }
        return element;
      });
    }, notValidElement$s)];
  }
  return children.map(child => {
    let element;
    if (!isStream(child)) {
      element = child;
    } else {
      element = createElement(reactive(), {}, child);
    }
    return element;
  });
}

export function h(tag, props, ...children) {
  let defaultProps = props || {};
  let wrappedChildren = wrapChildren(children);
  if (hasStream(defaultProps) || defaultProps && isStream(defaultProps.mount) || hasStream(wrappedChildren)) {
    return createElement(reactive(tag), toStreams(defaultProps), ...wrappedChildren);
  }
  return createElement(tag, defaultProps, ...wrappedChildren);
}
