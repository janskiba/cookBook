import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthorInformationDialogComponent } from "./author-information-dialog/author-information-dialog.component";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appTitle = '';

  constructor(private dialog: MatDialog, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AuthorInformationDialogComponent);
  }
}
