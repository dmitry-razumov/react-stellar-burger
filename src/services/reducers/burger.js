import {
  ADD_INGREDIENTS,
  ADD_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR
} from '../actions/burger';

const initialState = {
  bun: null,
  ingredients: []  
}

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.data
      }
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, 
          {...action.data, uuid: action.uuid}]
      }
    case DELETE_INGREDIENT: 
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.uuid !== action.uuid)
      }
    case SORT_INGREDIENTS: 
      return {
        ...state,
        ingredients: action.sort
      }
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    default: 
      return state
  }
}