import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
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
  }

  handleHeaderClick(e) {
    const { dialogId } = e.currentTarget.dataset;
    const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(dialogId);
    const overlayRef = dialogRef.componentInstance.dialogRef._overlayRef;

    console.log('Header clicked!!', overlayRef);
  }

  handleCloseDialog(e) {
    e.stopImmediatePropagation();

    this.dialogRef.close(this.dialogId);
  }
}
