import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeNameComponent } from './dialog-change-name.component';

describe('DialogChangeNameComponent', () => {
  let component: DialogChangeNameComponent;
  let fixture: ComponentFixture<DialogChangeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChangeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
