import { getIngredientsData } from '../../utils/burger-api';
import { AppDispatch, AppThunk } from '../types';
import { TIngredient } from '../types/data';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsErrorAction {
  type: typeof GET_INGREDIENTS_ERROR
}

export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS
  ingredients: ReadonlyArray<TIngredient>
}

export type TIngredientActions = IGetIngredientsRequestAction | IGetIngredientsErrorAction | IGetIngredientsSuccessAction;

export const getIngredientRequest = ():IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
})

export const getIngredientSuccess = (ingredients: ReadonlyArray<TIngredient>):IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
})

export const getIngredientError = ():IGetIngredientsErrorAction => ({
  type: GET_INGREDIENTS_ERROR
})

export const getIngredients:AppThunk = () => (dispatch:AppDispatch) => {
  dispatch(getIngredientRequest())
  getIngredientsData()
  .then(res => {
    if (res && res.success) {
      dispatch(getIngredientSuccess(res.data))
    } else {
      dispatch(getIngredientError())
    }})
  .catch(() => {
    dispatch(getIngredientError())
  })
}
