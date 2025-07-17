import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressButtonsComponent } from './progress-buttons.component';

describe('ProgressButtonsComponent', () => {
  let component: ProgressButtonsComponent;
  let fixture: ComponentFixture<ProgressButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressButtonsComponent]
    });
    fixture = TestBed.createComponent(ProgressButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
