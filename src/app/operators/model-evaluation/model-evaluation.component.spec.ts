import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEvaluationComponent } from './model-evaluation.component';

describe('ModelEvaluationComponent', () => {
  let component: ModelEvaluationComponent;
  let fixture: ComponentFixture<ModelEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
