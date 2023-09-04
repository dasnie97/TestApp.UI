import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowntimesComponent } from './downtimes.component';

describe('DowntimesComponent', () => {
  let component: DowntimesComponent;
  let fixture: ComponentFixture<DowntimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DowntimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DowntimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
