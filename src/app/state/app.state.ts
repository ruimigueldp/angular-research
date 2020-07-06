import { Injectable } from '@angular/core';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { AppStateModel } from '@interfaces/app-state';

import { AddDialog, CloseDialog, MinimizeDialog, CloseMinimizedDialog } from './app.actions';

export const defaultFactoryState = () => ({
  dialogs: {
    open: [],
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
  /**
   * Selector that returns open dialogs
   * @param state Current state of the application
   */
  @Selector()
  static openDialogs(state: AppStateModel) {
    return state.dialogs.open;
  }

  /**
   * Selector that returns minimized dialogs
   * @param state Current state of the application
   */
  @Selector()
  static minimizedDialogs(state: AppStateModel) {
    return state.dialogs.minimized;
  }

  @Action(AddDialog)
  addDialog(ctx: StateContext<AppStateModel>, action: AddDialog) {
    const state = ctx.getState();

    ctx.setState({ dialogs: {
      open: [...state.dialogs.open, { ref: action.dialog, id: action.dialog.id }],
      minimized: [...state.dialogs.minimized, action.dialog]
    }});
  }

  @Action(MinimizeDialog)
  minimizeDialog(ctx: StateContext<AppStateModel>, action: MinimizeDialog) {
    const state = {
      ...ctx.getState()
    };

    delete state.dialogs.open[action.id];

    state.dialogs.minimized = state.dialogs.minimized.filter(dialog => {
      let mutatedDialog = { ...dialog };

      if (dialog.id === action.id) {
        mutatedDialog = { ...action.dialogData };
      }

      return mutatedDialog;
    });

    ctx.setState({
      ...state,
    });
  }

  @Action(CloseDialog)
  closeDialog(ctx: StateContext<AppStateModel>, action: CloseDialog) {
    const state = {
      ...ctx.getState()
    };

    delete state.dialogs.open[action.id];

    state.dialogs.minimized = state.dialogs.minimized.filter(dialog => {
      return dialog.id !== action.id;
    });

    ctx.setState({
      ...state,
    });
  }

  @Action(CloseMinimizedDialog)
  closeMinimizedDialog(ctx: StateContext<AppStateModel>, action: CloseMinimizedDialog) {
    const state = {
      ...ctx.getState()
    };

    state.dialogs.minimized = state.dialogs.minimized.filter(dialog => {
      return dialog.id !== action.id;
    });

    ctx.setState({
      ...state,
    });
  }
}
