import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowRunComponent } from './workflow-run.component';

describe('WorkflowRunComponent', () => {
  let component: WorkflowRunComponent;
  let fixture: ComponentFixture<WorkflowRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
