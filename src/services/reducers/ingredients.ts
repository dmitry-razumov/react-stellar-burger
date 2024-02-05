import { TIngredientActions } from '../actions/ingredients';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_SUCCESS
} from '../actions/ingredients';
import { TIngredient } from '../types/data';

type TIngredientState = {
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  ingredients: ReadonlyArray<TIngredient> | null,
}

const initialState:TIngredientState= {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: null,
}

export const ingredientsReducer = (state = initialState, action:TIngredientActions):TIngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: 
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFailed: false
      }
    case GET_INGREDIENTS_ERROR: 
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    default:
      return state
  }
}