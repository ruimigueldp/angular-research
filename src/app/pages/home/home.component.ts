import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ElementDialogComponent } from '@components/element-dialog/element-dialog.component';
import { PeriodicElement } from '@interfaces/periodic-element';

import { AppService } from '@services/app.service';
import { AppState } from '@state/app.state';
import { Select } from '@ngxs/store';
import { Observable, pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  /**
   * Selector that returns open dialogs
   */
  @Select(AppState.openDialogs) openDialogs$: Observable<any>;

  /**
   * Selector that returns minimized dialogs
   */
  @Select(AppState.minimizedDialogs) minimizedDialogs$: Observable<any>;

  openDialogs = [];

  constructor(private dialogService: MatDialog, private appService: AppService) {
  }

  ngOnInit() {
    this.openDialogs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(dialogs => {
        if (dialogs) {
          this.openDialogs = dialogs;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleOpenDialog(element: PeriodicElement): void {
    const dialogName = `${element.symbol.toLowerCase()}-${element.name.toLowerCase()}`;

    if (!this.isOpenDialog(dialogName)) {
      this.appService.openDialog(dialogName, element, ElementDialogComponent);
      // this.assignDialog(dialogName, element);
      // this.minimizedDialogs.push({ id: dialogName, ...element });
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
    this.appService.closeMinimized(data.id);
  }

  handleOpenMinimizedEvt(data) {
    if (!this.isOpenDialog(data.id)) {
      const { id, ...rest } = data;

      this.appService.openDialog(id, rest, ElementDialogComponent);
    } else {
      const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(data.id);
      const overlayRef = dialogRef.componentInstance.dialogRef._overlayRef;

      this.appService.handleFocusDialog(overlayRef);
    }
  }

  private isOpenDialog(name: string) {
    return this.openDialogs.find(dialog => dialog.id === name);
  }
}
