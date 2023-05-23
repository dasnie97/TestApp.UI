import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogfilesListComponent } from './testreport-list.component';

describe('LogfilesListComponent', () => {
  let component: LogfilesListComponent;
  let fixture: ComponentFixture<LogfilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogfilesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogfilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
