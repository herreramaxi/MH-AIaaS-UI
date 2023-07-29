import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowJobDetailsComponent } from './workflow-job-details.component';

describe('WorkflowJobDetailsComponent', () => {
  let component: WorkflowJobDetailsComponent;
  let fixture: ComponentFixture<WorkflowJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowJobDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
