import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAndPreviewStepComponent } from './settings-and-preview-step.component';

describe('SettingsAndPreviewStepComponent', () => {
  let component: SettingsAndPreviewStepComponent;
  let fixture: ComponentFixture<SettingsAndPreviewStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAndPreviewStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAndPreviewStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
