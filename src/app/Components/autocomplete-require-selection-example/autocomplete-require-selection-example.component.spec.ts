import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteRequireSelectionExampleComponent } from './autocomplete-require-selection-example.component';

describe('AutocompleteRequireSelectionExampleComponent', () => {
  let component: AutocompleteRequireSelectionExampleComponent;
  let fixture: ComponentFixture<AutocompleteRequireSelectionExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteRequireSelectionExampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteRequireSelectionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
