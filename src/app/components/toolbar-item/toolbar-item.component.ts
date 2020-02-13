import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { PeriodicElement } from '@interfaces/periodic-element';

@Component({
  selector: 'app-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss']
})
export class ToolbarItemComponent implements OnInit {
  @Input() item: PeriodicElement;

  @Output() closeMinimizedDialogEvent = new EventEmitter<PeriodicElement>();

  constructor(
    public dialogService: MatDialog
  ) { }

  ngOnInit() {
  }

  handleCloseDialog() {
    const { id } = this.item;
    const dialogRef: MatDialogRef<any> = this.dialogService.getDialogById(id);

    if (dialogRef) {
      dialogRef.close({
        id,
        action: 'close'
      });
    } else {
      this.closeMinimizedDialogEvent.emit(this.item);
    }
  }

  handleFocusDialog() {
    console.log('Dialog focus')
  }
}
