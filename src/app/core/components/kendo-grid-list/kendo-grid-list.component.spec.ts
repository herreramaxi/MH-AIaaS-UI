import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoGridListComponent } from './kendo-grid-list.component';

describe('KendoGridListComponent', () => {
  let component: KendoGridListComponent;
  let fixture: ComponentFixture<KendoGridListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KendoGridListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KendoGridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
