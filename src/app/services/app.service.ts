import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddDialog, CloseDialog, MinimizeDialog, CloseMinimizedDialog } from '@state/app.actions';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentFocusOverlayRef = null;

  constructor(private store: Store, private dialog: MatDialog) { }

  openDialog(dialogName: string, data: any, dialogTemplate: any) {
    const dialogRef = this.dialog.open(
      dialogTemplate,
      {
        id: dialogName,
        width: 'auto',
        hasBackdrop: false,
        data: {
          ...data,
          focusCallback: this.handleFocusDialog.bind(this)
        }
      }
    );

    this.store.dispatch(new AddDialog(dialogRef));

    dialogRef.afterClosed().subscribe(this.handleCloseDialog.bind(this));
  }

  closeMinimized(id) {
    this.store.dispatch(new CloseMinimizedDialog(id));
  }

  handleFocusDialog(overlayRef) {
    if (!this.currentFocusOverlayRef) {
      this.focusHost(overlayRef);
    } else {
      if (this.currentFocusOverlayRef.hostElement) {
        this.currentFocusOverlayRef.hostElement.style.zIndex = '1000';
      }

      this.focusHost(overlayRef);
    }
  }

  private focusHost(hostEl) {
    this.currentFocusOverlayRef = hostEl;
    this.currentFocusOverlayRef.hostElement.style.zIndex = '1001';
  }

  private handleCloseDialog(data: { dialog: any; action: string }): void {
    if (data.action === 'close') {
      this.store.dispatch(new CloseDialog(data.dialog.id));
    } else if (data.action === 'minimize') {
      this.store.dispatch(new MinimizeDialog(data.dialog.id, data.dialog));
    }
  }
}
