import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  isMaximized = false;

  @Input() title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    public dialogService: MatDialog
  ) { }

  get dialogId() {
    const { data } = this;

    return data.symbol.toLowerCase() + '-' + data.name.toLowerCase();
  }

  ngOnInit() {
    console.log(this.data.isMaximized, this.data);

    if (this.data.isMaximized) {
      this.handleMaximizeDialog();
    }
  }

  handleHeaderClick(e) {
    const { dialogId } = e.currentTarget.dataset;
    const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(dialogId);
    const overlayRef = dialogRef.componentInstance.dialogRef._overlayRef;

    console.log('Header clicked!!', overlayRef);
  }

  handleMinimizeDialog(e) {
    e.stopImmediatePropagation();

    this.dialogRef.close({
      dialog: {
        id: this.dialogId,
        ...this.data,
        isMaximized: this.isMaximized,
      },
      action: 'minimize'
    });
  }

  handleCloseDialog(e) {
    e.stopImmediatePropagation();

    this.dialogRef.close({ dialog: { id: this.dialogId, ...this.data }, action: 'close' });
  }

  handleMaximizeDialog(e = null) {
    if (e) {
      e.stopImmediatePropagation();
    }

    this.isMaximized = this.isMaximized
      ? false
      : true;

    this.dialogRef.updateSize(
      this.isMaximized ? '80vw' : '20vw',
      this.isMaximized ? '80vh' : 'auto'
    );
  }
}
