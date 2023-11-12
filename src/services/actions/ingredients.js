import { getIngredientsData } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const OPEN_INGREDIENT_DETAILS_MODAL = 'OPEN_INGREDIENT_DETAILS_MODAL';
export const CLOSE_INGREDIENT_DETAILS_MODAL = 'CLOSE_INGREDIENT_DETAILS_MODAL';


export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    getIngredientsData()
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        })
      }})
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_ERROR
      })
    })
  }
}

export function openIngredientDetails(ingredient) {
  return function(dispatch) {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS_MODAL, 
      ingredient: ingredient
    })
  }
}
  
export function closeIngredientDetails() {
  return function(dispatch) {
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS_MODAL
    })
  }
}