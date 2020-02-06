import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@components/material.module';

import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [DialogComponent, TableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogComponent,
    TableComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ComponentsModule { }
