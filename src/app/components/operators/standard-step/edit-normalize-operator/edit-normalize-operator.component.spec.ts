import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNormalizeOperatorComponent } from './edit-normalize-operator.component';

describe('EditNormalizeOperatorComponent', () => {
  let component: EditNormalizeOperatorComponent;
  let fixture: ComponentFixture<EditNormalizeOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNormalizeOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNormalizeOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
