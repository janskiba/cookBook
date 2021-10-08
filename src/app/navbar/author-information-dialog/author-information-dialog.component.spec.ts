import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorInformationDialogComponent } from './author-information-dialog.component';

describe('AuthorInformationDialogComponent', () => {
  let component: AuthorInformationDialogComponent;
  let fixture: ComponentFixture<AuthorInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorInformationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
