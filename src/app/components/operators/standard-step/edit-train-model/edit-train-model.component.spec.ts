import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainModelComponent } from './edit-train-model.component';

describe('EditTrainModelComponent', () => {
  let component: EditTrainModelComponent;
  let fixture: ComponentFixture<EditTrainModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrainModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
