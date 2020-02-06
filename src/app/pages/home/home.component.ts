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

  constructor(public dialogService: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(element: PeriodicElement): void {

    debugger
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
}
