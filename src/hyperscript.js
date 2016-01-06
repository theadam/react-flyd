import { isStream } from 'flyd';
import { createElement } from 'react';
import { reactive } from 'react-flyd-class';

import { hasStream } from './utils';

function wrapChildren(children){
  return children.map(child => {
    if(!isStream(child)) return child;
    return createElement(reactive('span'), {}, child);
  });
}

export function h(tag, props, ...children){
  if(hasStream(props) || props && isStream(props.mount)){
    return createElement(
      reactive(tag),
      props,
      ...(children.length === 1 ? children : wrapChildren(children))
    );
  }
  return createElement(tag, props, ...wrapChildren(children));
}
