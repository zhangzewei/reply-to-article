import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  replys: [],
});

export default function foo(state = INITIAL_STATE, action) {
  console.log(state);
  switch (action.type) {
    case at.ADD_REPLYS:
      return state.update('replys', () => (immutable.fromJS(action.replys)));
    default:
      return state;
  }
}
