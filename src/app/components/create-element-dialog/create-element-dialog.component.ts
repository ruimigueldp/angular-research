import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-element-dialog',
  templateUrl: './create-element-dialog.component.html',
  styleUrls: ['./create-element-dialog.component.scss']
})
export class CreateElementDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('----- CREATE ELEMENT DIALOG OPEN -----', this.data);
  }
}
