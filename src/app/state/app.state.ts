import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AppStateModel } from '@interfaces/app-state';

import { AddDialog } from './app.actions';

export const defaultFactoryState = () => ({
  dialogs: {
    open: {},
    minimized: []
  }
});

@State<AppStateModel>({
  name: 'app',
  defaults: {
    ...defaultFactoryState(),
  }
})
@Injectable({
  providedIn: 'root',
})
export class AppState {
  @Action(AddDialog)
  addDialog(ctx: StateContext<AppStateModel>, action: AddDialog) {
    const state = {
      ...ctx.getState()
    };

    state.dialogs.open[action.name] = action.dialog;

    ctx.setState({
      ...state,
    });
  }
}
