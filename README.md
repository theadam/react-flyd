react-flyd
=========================

Allows for flyd streams to be embedded directly into JSX, and to update content when the streams fire events.

# Counter Example

You can compare this example to [Counter example of Cycle.js](https://github.com/cyclejs/cycle-examples/blob/master/counter/src/main.js), [Counter example of Yolk](https://github.com/yolkjs/yolk#example), and [Counter example of React Reactive Class](https://github.com/jas-chen/react-reactive-class#counter-example).

```javascript
/** @jsx h */

import { render } from 'react-dom';
import { h } from 'react-flyd';
import { stream, scan, merge} from 'flyd';


function Counter() {
  const plus$ = stream();
  const minus$ = stream();

  const action$ = merge(
    plus$.map(() => 1),
    minus$.map(() => -1)
  );

  const count$ = scan((x, y) => x + y, 0, action$);

  return (
    <div>
      <div>
        <button id="plus" onClick={ stream(plus$) }>+</button>
        <button id="minus" onClick={ stream(minus$) }>-</button>
      </div>
      <div>
        Count: { count$ }
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
```
