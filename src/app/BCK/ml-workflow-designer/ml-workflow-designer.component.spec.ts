import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlWorkflowDesignerComponent } from './ml-workflow-designer.component';

describe('MlWorkflowDesignerComponent', () => {
  let component: MlWorkflowDesignerComponent;
  let fixture: ComponentFixture<MlWorkflowDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlWorkflowDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlWorkflowDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
