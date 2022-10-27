import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogfileComponent } from './edit-logfile.component';

describe('EditLogfileComponent', () => {
  let component: EditLogfileComponent;
  let fixture: ComponentFixture<EditLogfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLogfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
