import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressDialogComponent } from '../components/dialogs/progress-dialog/progress-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  show(content = ''){
    this.dialog.open(ProgressDialogComponent, {
      data: {
        content: content
      },
      disableClose: true,
    }
    )
  }

  hide(){
    this.dialog.closeAll();
  }
}
