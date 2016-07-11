import { isStream, combine } from 'flyd';
import { createElement, isValidElement } from 'react';
import { reactive } from 'react-flyd-class';

import { hasStream, toStreams } from './utils';

function wrapChildren(children) {
  const notValidElement$s = children.filter(child => isStream(child) && !isValidElement(child()));
  if (notValidElement$s.length>0) {
    return combine(() => {
      return children.map(child => {
        if (!isStream(child)) {
          return child;
        } else if (notValidElement$s.indexOf(child) > -1) {
          return child();
        } else {
          return createElement(reactive(), {}, child);
        }
      });
    }, notValidElement$s);
  } else {
    return children.map(child => {
      if (!isStream(child)) {
        return child;
      } else {
        return createElement(reactive(), {}, child);
      }
    })
  }
}


export function h(tag, props, ...children) {
  props = props || {}
  children = wrapChildren(children)
  if (hasStream(props) || props && isStream(props.mount) || isStream(children)) {
    if (isStream(children)) {
      return createElement(reactive(tag), toStreams(props), children);
    } else {
      return createElement(reactive(tag), toStreams(props), ...children);
    }
  }
  return createElement(tag, props, ...children);
}
