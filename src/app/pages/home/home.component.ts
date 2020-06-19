import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ElementDialogComponent, } from '@components/element-dialog/element-dialog.component';
import { PeriodicElement } from '@interfaces/periodic-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  openDialogs = {};
  minimizedDialogs = [];
  currentFocusOverlayRef = null;

  constructor(public dialogService: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(element: PeriodicElement): void {
    const dialogName = `${element.symbol.toLowerCase()}-${element.name.toLowerCase()}`;

    if (!this.openDialogs[dialogName]) {
      this.assignDialog(dialogName, element);
      this.minimizedDialogs.push({ id: dialogName, ...element });
    } else {
      const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(Object.keys(this.openDialogs).find(
        refName => refName === dialogName
      ));
      const overlayRef = dialogRef.componentInstance.dialogRef._overlayRef;

      console.log('Already opened!!', overlayRef);
      // debugger
    }
    // debugger
    // const dialogRef = this.dialogService.open(
    //   DialogComponent,
    //   {
    //     id: 'cenas1',
    //     hasBackdrop: false,
    //     position: {
    //       left: '0',
    //       top: '0',
    //     },
    //     height: '100vh',
    //     width: '50vw',
    //     data: {
    //       title: 'Dialog title cenas',
    //     }
    //   }
    // );

    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('The dialog was closed');
    // });
  }

  handleCloseMinimizedEvt(data) {
    this.minimizedDialogs = this.minimizedDialogs.filter(dialog => {
      return dialog.id !== data.id;
    });
  }

  handleOpenMinimizedEvt(data) {
    if (!this.openDialogs[data.id]) {
      const { id, ...rest } = data;

      this.assignDialog(id, rest);
    } else {
      const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(data.id);
      const overlayRef = dialogRef.componentInstance.dialogRef._overlayRef;

      this.handleFocusDialog(overlayRef);
    }
  }

  private _handleOverlayFocus() {

  }

  private assignDialog(dialogName: string, element: PeriodicElement) {
    this.openDialogs[dialogName] = this.dialogService.open(
      ElementDialogComponent,
      {
        id: dialogName,
        width: 'auto',
        hasBackdrop: false,
        data: {
          ...element,
          focusCallback: this.handleFocusDialog.bind(this)
        }
      }
    );

    this.openDialogs[dialogName].afterClosed().subscribe(this.handleCloseDialog.bind(this));
  }

  private handleCloseDialog(data: { dialog: PeriodicElement; action: string }): void {
    if (data.action === 'close') {
      delete this.openDialogs[data.dialog.id];
      this.minimizedDialogs = this.minimizedDialogs.filter(dialog => {
        return dialog.id !== data.dialog.id;
      });
    } else if (data.action === 'minimize') {
      delete this.openDialogs[data.dialog.id];

      this.minimizedDialogs = this.minimizedDialogs.map((dialog) => {
        let mutatedDialog = { ...dialog };

        if (dialog.id === data.dialog.id) {
          mutatedDialog = { ...data.dialog };
        }

        return mutatedDialog;
      });
    }
  }

  private handleFocusDialog(overlayRef) {
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
}
