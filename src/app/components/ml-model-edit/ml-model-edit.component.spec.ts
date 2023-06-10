import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MlModelEditComponent } from './ml-model-edit.component';

describe('MlModelEditComponent', () => {
  let component: MlModelEditComponent;
  let fixture: ComponentFixture<MlModelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MlModelEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MlModelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
