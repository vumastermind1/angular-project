import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  showNotification(
    message: string,
    action?: string,
    options?: MatSnackBarConfig,
    actionCallback?: () => void
  ) {
    action = action || '';
    options = options || {};
    setTimeout(() => {
      const snackBarRef = this.snackBar.open(message || 'Ok', action, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 'snackbar--notification',
        ...options
      });

      if (actionCallback) {
        snackBarRef.onAction().subscribe(actionCallback);
      }
    });
  }

  showError(
    message: string,
    action?: string,
    options?: MatSnackBarConfig,
    actionCallback?: () => void
  ) {
    action = action || '';
    options = options || {};
    setTimeout(() => {
      const snackBarRef = this.snackBar.open(
        message || 'Something is wrong',
        action,
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'snackbar--error',
          ...options
        }
      );

      if (actionCallback) {
        snackBarRef.onAction().subscribe(actionCallback);
      }
    });
  }
}
