import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectionStepComponent } from './file-selection-step.component';

describe('FileSelectionStepComponent', () => {
  let component: FileSelectionStepComponent;
  let fixture: ComponentFixture<FileSelectionStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectionStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSelectionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
