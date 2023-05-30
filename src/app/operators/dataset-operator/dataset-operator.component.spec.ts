import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetOperatorComponent } from './dataset-operator.component';

describe('DatasetOperatorComponent', () => {
  let component: DatasetOperatorComponent;
  let fixture: ComponentFixture<DatasetOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
