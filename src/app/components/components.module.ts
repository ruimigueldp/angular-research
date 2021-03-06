import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@components/material.module';

import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { LoadingComponent } from './loading/loading.component';
import { ElementDialogComponent } from './element-dialog/element-dialog.component';
import { NavComponent } from './nav/nav.component';
import { CreateElementDialogComponent } from './create-element-dialog/create-element-dialog.component';

import { ObsWithStatus } from '@pipes/obs-with-status.pipe';

@NgModule({
  declarations: [
    DialogComponent,
    ElementDialogComponent,
    TableComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    LoadingComponent,
    NavComponent,
    ObsWithStatus,
    CreateElementDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogComponent,
    ElementDialogComponent,
    TableComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    LoadingComponent,
    NavComponent,
    ObsWithStatus,
    CreateElementDialogComponent,
  ],
  entryComponents: [
    DialogComponent,
    ElementDialogComponent,
  ]
})
export class ComponentsModule { }
