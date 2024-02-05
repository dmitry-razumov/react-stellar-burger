import { v4 as uuid4 } from 'uuid';
import { TIngredient } from '../types/data';
  
export const ADD_INGREDIENTS: 'ADD_INGREDIENTS' = 'ADD_INGREDIENTS';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SORTED_INGREDIENTS' = 'SORTED_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR'= 'CLEAR_CONSTRUCTOR';

export interface IAddBun {
  readonly type: typeof ADD_BUN,
  readonly data: TIngredient
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENTS,
  readonly data: TIngredient,
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT,
  readonly uuid: string
}

export interface ISortIngredients {
  readonly type: typeof SORT_INGREDIENTS,
  readonly sort: ReadonlyArray<TIngredient>
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR,
}

export type TBurgerActions = IAddBun | IAddIngredient | IDeleteIngredient | ISortIngredients | IClearConstructor;

export const addBun = (item:TIngredient): IAddBun => ({
  type: ADD_BUN,
  data: item
})

export const addIngredient = (item:TIngredient):IAddIngredient => ({
  type: ADD_INGREDIENTS, 
  data: {...item, uuid: uuid4()}
})

export const deleteIngredient = (uuid:string):IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  uuid: uuid
})

export const sortIngredients = (ingredients:ReadonlyArray<TIngredient>):ISortIngredients => ({
  type: SORT_INGREDIENTS,
  sort: ingredients
})
