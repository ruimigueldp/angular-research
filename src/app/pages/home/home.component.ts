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

  openDialogs = {};
  minimizedDialogs = [];

  constructor(public dialogService: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(element: PeriodicElement): void {
    const dialogName = `${element.symbol.toLowerCase()}-${element.name.toLowerCase()}`;

    if (!this.openDialogs[dialogName]) {
      this.openDialogs[dialogName] = this.dialogService.open(
        DialogComponent,
        {
          id: dialogName,
          width: '20vw',
          hasBackdrop: false,
          data: {
            ...element
          }
        }
      );

      this.openDialogs[dialogName].afterClosed().subscribe(this.handleCloseDialog.bind(this));
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

  private _handleOverlayFocus() {

  }

  private handleCloseDialog(data: { id: string; action: string }): void {
    if (data.action === 'close') {
      delete this.openDialogs[data.id];
      this.minimizedDialogs = this.minimizedDialogs.filter(dialog => {
        return dialog.id !== data.id;
      });
    } else if (data.action === 'minimize') {
      delete this.openDialogs[data.id];
    }
  }
}
