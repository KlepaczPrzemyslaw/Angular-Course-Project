import { ActionReducerMap } from '@ngrx/store';

import * as formShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as formAuth from "../auth/store/auth.reducers";

export interface AppState {
  shoppingList: formShoppingList.State,
  auth: formAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: formShoppingList.shoppingListRrducer,
  auth: formAuth.authReducer
}
