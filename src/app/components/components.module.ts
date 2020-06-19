import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@components/material.module';

import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { LoadingComponent } from './loading/loading.component';

import { ObsWithStatus } from '@pipes/obs-with-status.pipe';

@NgModule({
  declarations: [
    DialogComponent,
    TableComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    LoadingComponent,
    ObsWithStatus,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogComponent,
    TableComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    LoadingComponent,
    ObsWithStatus,
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class ComponentsModule { }
