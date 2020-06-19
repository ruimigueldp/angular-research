import { MatDialogRef, MatDialog } from '@angular/material';

export interface AppStateModel {
  dialogs: {
    open: {
      [key: string]: MatDialogRef<MatDialog>
    };
    minimized: any[]
  };
}
