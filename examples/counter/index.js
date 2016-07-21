/** @jsx h */
import { Component, PropTypes } from 'react';
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

class Test extends Component {
  state = {
    show: true,
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ show: !this.state.show })}>Click</button>
        {this.state.show ? (
          <div>
            {this.props.count$.map(n => <span>{n}</span>)}
          </div>
        ) : null}
      </div>
    );
  }
}

Test.propTypes = {
  count$: PropTypes.func.isRequired,
};

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
        <button mount={count$.map(c => c < 10)} id="plus" onClick={stream(plus$)}>+</button>
      </div>
      <div>
        Count: {count$}
      </div>
      <ul>
        {count$.map(getArray).map(list => list.map(item =>
          <li>{item}</li>
        ))}
        <li
          style={{ color: count$.map(x => (x % 2 === 0 ? 'red' : 'blue')) }}
        >
          Item is always here
        </li>
      </ul>
      <Test count$={stream(count$)} />
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
