import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportListComponent } from './testreport-list.component';

describe('LogfilesListComponent', () => {
  let component: TestReportListComponent;
  let fixture: ComponentFixture<TestReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
