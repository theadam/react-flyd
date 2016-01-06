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
        <button id="plus" onClick={ (e) => plus$(e) }>+</button>
        <button id="minus" onClick={ (e) => minus$(e) }>-</button>
      </div>
      <div>
        Count: { count$ }
      </div>
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
