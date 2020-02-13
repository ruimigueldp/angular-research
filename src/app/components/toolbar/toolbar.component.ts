import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PeriodicElement } from '@interfaces/periodic-element';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() dialogs: MatDialogRef<any>;

  @Output() closeMinimizedDialogEvent = new EventEmitter<PeriodicElement>();

  constructor() { }

  ngOnInit() {
  }

  handleCloseMinimizedDialog(data: PeriodicElement) {
    this.closeMinimizedDialogEvent.emit(data);
  }
}
