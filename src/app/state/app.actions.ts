export class AddDialog {
  static readonly type = '[App] Add Dialog';

  constructor(public dialog: any) {}
}

export class CloseDialog {
  static readonly type = '[App] Close Dialog';

  constructor(public id: string) {}
}

export class CloseMinimizedDialog {
  static readonly type = '[App] Close Minimized Dialog';

  constructor(public id: string) {}
}

export class MinimizeDialog {
  static readonly type = '[App] Minimize Dialog';

  constructor(public id: string, public dialogData: any) {}
}

export class ToggleDialogMaximized {
  static readonly type = '[App] Toggle Dialog Maximized';

  constructor(public name: string) {}
}
