import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaStepComponent } from './schema-step.component';

describe('SchemaStepComponent', () => {
  let component: SchemaStepComponent;
  let fixture: ComponentFixture<SchemaStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemaStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemaStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
