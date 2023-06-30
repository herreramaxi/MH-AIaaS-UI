import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishWorkflowComponent } from './publish-workflow.component';

describe('PublishWorkflowComponent', () => {
  let component: PublishWorkflowComponent;
  let fixture: ComponentFixture<PublishWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
