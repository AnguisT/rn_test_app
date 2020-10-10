import fakeData from './fakeData.json';

export const FETCH_PIZZA = 'FETCH_PIZZA';
export const fetchPizza = () => ({type: FETCH_PIZZA});

export const FETCH_PIZZA_SUCCESS = 'FETCH_PIZZA_SUCCESS';
export const fetchPizzaSuccess = (payload) => ({
  type: FETCH_PIZZA_SUCCESS,
  payload,
});

export const FETCH_PIZZA_FAILED = 'FETCH_PIZZA_FAILED';
export const fetchPizzaFailed = () => ({
  type: FETCH_PIZZA_FAILED,
});

export const pizzaRequestAsync = () => async (dispatch) => {
  dispatch(fetchPizza());
  const result = fakeData;
  if (!result.length) {
    dispatch(fetchPizzaFailed());
    return;
  }

  dispatch(fetchPizzaSuccess(result));
};
