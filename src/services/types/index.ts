import { Action, ActionCreator, Dispatch } from "redux";
import { store } from "../../index";
import { TBurgerActions } from "../actions/burger";
import { ThunkAction } from "redux-thunk";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TIngredientActions } from "../actions/ingredients";
import { TWsActions } from "../actions/wsActions";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TBurgerActions | TOrderActions | TUserActions | TIngredientActions | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;
