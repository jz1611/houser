import { createStore } from 'redux';

const initialState = {
  loggedInUser: {
    username: "",
    id: null
  },
  property: {
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    img_url: "",
    loan: null,
    mortgage: null,
    rent: null
  }
};

export const SET_LOGIN = "SET_LOGIN";
export const LOGOUT = "LOGOUT";

function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_LOGIN:
      return {
        ...state,
        loggedInUser: {
          ...action.payload
        }
      }
    default:
      return state;
  }
}

export default createStore(reducer);