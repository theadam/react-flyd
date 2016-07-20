import { createElement } from 'react';
import { reactive } from 'react-flyd-class';
import { hasStream as arrayHasStream } from 'react-flyd-class/lib/utils';

import { hasStream, toStreams } from './utils';

export function h(tag, props, ...children) {
  if (hasStream(props) || arrayHasStream(children)) {
    return createElement(
      reactive(tag),
      toStreams(props || {}),
      ...children,
    );
  }
  return createElement(tag, props, ...children);
}
