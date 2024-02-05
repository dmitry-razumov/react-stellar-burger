import type { TBurgerActions } from '../actions/burger';

import {
  ADD_INGREDIENTS,
  ADD_BUN,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  CLEAR_CONSTRUCTOR
} from '../actions/burger';

import type { TIngredient } from '../types/data';

type TItemState = {
  bun: TIngredient | null,
  ingredients: ReadonlyArray<TIngredient>;
}

const itemInitialState : TItemState = {
  bun: null,
  ingredients: []  
}

export const burgerReducer = (state = itemInitialState, action: TBurgerActions): TItemState => {
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
          action.data]
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