import { v4 as uuid4 } from 'uuid';
  
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORTED_INGREDIENTS';

export function addBun(item) {
  return function(dispatch) {
    dispatch({
      type: ADD_BUN,
      data: item
    })
  }
}

export function addIngredient(item) {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENTS, 
      data: item,
      uuid: uuid4()
    })
  }
}

export function deleteIngredient(uuid) {
  return function(dispatch) {
    dispatch({
      type: DELETE_INGREDIENT,
      uuid: uuid
    })
  }
}

export function sortIngredients(ingredients) {
  return function(dispatch) {
    dispatch({
      type: SORT_INGREDIENTS,
      sort: ingredients
    })
  }
}