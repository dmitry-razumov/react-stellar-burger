import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_SUCCESS
    // OPEN_INGREDIENT_DETAILS_MODAL,
    // CLOSE_INGREDIENT_DETAILS_MODAL
} from '../actions/ingredients';

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: null,
  ingredientDetails: null
}


export const ingredientsReducer = (state = initialState, action) => {
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