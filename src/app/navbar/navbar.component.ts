import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AuthorInformationDialogComponent } from "./author-information-dialog/author-information-dialog.component";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() appTitle = '';

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(AuthorInformationDialogComponent);
  }
}
