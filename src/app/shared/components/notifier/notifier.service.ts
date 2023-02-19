import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifierComponent } from "./notifier.component";

@Injectable({
  providedIn: "root",
})
export class NotifierService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(
    displayMessage: string,
    buttonText: string,
    messageType: "error" | "success"
  ) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      duration: messageType === "error" ? 10000 : 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: messageType,
    });
  }
}
