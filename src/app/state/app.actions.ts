import { MatDialogRef, MatDialog } from '@angular/material';

export class AddDialog {
  static readonly type = '[App] Add Dialog';

  constructor(public name: string, public dialog: MatDialogRef<MatDialog>) {}
}

export class RemoveDialog {
  static readonly type = '[App] Remove Dialog';

  constructor(public name: string) {}
}

export class AddMinimizedDialog {
  static readonly type = '[App] Add Minimized Dialog';

  constructor(public dialogData: any) {}
}

export class RemoveMinimizedDialog {
  static readonly type = '[App] Remove Minimized Dialog';

  constructor(public id: any) {}
}

export class ToggleDialogMaximized {
  static readonly type = '[App] Toggle Dialog Maximized';

  constructor(public name: string) {}
}
