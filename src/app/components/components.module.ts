import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@components/material.module';

import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';

@NgModule({
  declarations: [DialogComponent, TableComponent, ToolbarComponent, ToolbarItemComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogComponent,
    TableComponent,
    ToolbarComponent,
    ToolbarItemComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ComponentsModule { }
