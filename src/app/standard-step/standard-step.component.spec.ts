import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardStepComponent } from './standard-step.component';

describe('StandardStepComponent', () => {
  let component: StandardStepComponent;
  let fixture: ComponentFixture<StandardStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
