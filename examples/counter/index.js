/** @jsx h */
import { render } from 'react-dom';
import { h } from 'react-flyd';
import { stream, scan, merge } from 'flyd';

function getArray(length) {
  const list = [];
  if (length <= 0) return list;
  for (let i = 0; i < length; i++) {
    list.push(`Item ${i}`);
  }
  return list;
}

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
        <button id="minus" onClick={stream(minus$)}>-</button>
        <button id="plus" onClick={stream(plus$)}>+</button>
      </div>
      <div>
        Count: {count$}
      </div>
      <ul>
        {count$.map(getArray).map(list => list.map(item =>
          <li>{item}</li>
        ))}
        <li>Item is always here</li>
      </ul>
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
