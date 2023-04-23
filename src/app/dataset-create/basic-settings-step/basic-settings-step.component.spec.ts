import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSettingsStepComponent } from './basic-settings-step.component';

describe('BasicSettingsStepComponent', () => {
  let component: BasicSettingsStepComponent;
  let fixture: ComponentFixture<BasicSettingsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSettingsStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSettingsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
