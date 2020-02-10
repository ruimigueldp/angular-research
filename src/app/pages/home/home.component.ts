import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { DialogComponent } from '@components/dialog/dialog.component';
import { PeriodicElement } from '@interfaces/periodic-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dialogs = {};

  constructor(public dialogService: MatDialog) {
  }

  get dialogsArray() {
    console.log(Object.keys(this.dialogs).map(dialogId => {
      return this.dialogs[dialogId].ref;
    }))

    return Object.keys(this.dialogs).map(dialogId => {
      return this.dialogs[dialogId].ref;
    });
  }

  ngOnInit() {
  }

  openDialog(element: PeriodicElement): void {
    const dialogName = `${element.symbol.toLowerCase()}-${element.name.toLowerCase()}`;

    if (!this.dialogs[dialogName]) {
      this.dialogs[dialogName] = {
        ref: this.dialogService.open(
          DialogComponent,
          {
            id: dialogName,
            width: '20vw',
            hasBackdrop: false,
            data: {
              ...element
            }
          }
        )
      };

      this.dialogs[dialogName].ref.afterClosed().subscribe(this.handleCloseDialog.bind(this));
    } else {
      const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(Object.keys(this.dialogs).find(
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

  private _handleOverlayFocus() {

  }

  private handleCloseDialog(dialogId: string) {
    delete this.dialogs[dialogId];
  }
}
