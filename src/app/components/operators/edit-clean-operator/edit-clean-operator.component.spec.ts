import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCleanOperatorComponent } from './edit-clean-operator.component';

describe('EditCleanOperatorComponent', () => {
  let component: EditCleanOperatorComponent;
  let fixture: ComponentFixture<EditCleanOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCleanOperatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCleanOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
