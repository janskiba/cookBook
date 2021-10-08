import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-information-dialog',
  templateUrl: './author-information-dialog.component.html',
  styleUrls: ['./author-information-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInformationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
