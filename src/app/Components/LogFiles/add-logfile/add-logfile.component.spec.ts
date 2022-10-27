import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogfileComponent } from './add-logfile.component';

describe('AddLogfileComponent', () => {
  let component: AddLogfileComponent;
  let fixture: ComponentFixture<AddLogfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLogfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLogfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
