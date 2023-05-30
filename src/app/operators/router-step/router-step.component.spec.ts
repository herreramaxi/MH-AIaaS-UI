import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterStepComponent } from './router-step.component';

describe('RouterStepComponent', () => {
  let component: RouterStepComponent;
  let fixture: ComponentFixture<RouterStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
