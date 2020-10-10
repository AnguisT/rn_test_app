import {combineReducers} from 'redux';
import {FETCH_PIZZA, FETCH_PIZZA_FAILED, FETCH_PIZZA_SUCCESS} from './actions';

export const isLoadingPizza = (state = false, action) => {
  switch (action.type) {
    case FETCH_PIZZA:
      return true;
    case FETCH_PIZZA_FAILED:
    case FETCH_PIZZA_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const pizza = (state = [], action) => {
  switch (action.type) {
    case FETCH_PIZZA_SUCCESS:
      return [...action.payload];
    case FETCH_PIZZA_FAILED:
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  isLoadingPizza,
  pizza,
});
