// Actions
const SET = 'test/SET';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case SET:
      // Perform action
      return state;
    default:
      return state;
  }
}

// Action Creators
export function setTest() {
  return { type: SET };
}

