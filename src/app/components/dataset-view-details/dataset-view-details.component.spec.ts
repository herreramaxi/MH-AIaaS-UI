import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetViewDetailsComponent } from './dataset-view-details.component';

describe('DatasetViewDetailsComponent', () => {
  let component: DatasetViewDetailsComponent;
  let fixture: ComponentFixture<DatasetViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetViewDetailsComponent]
    });
    fixture = TestBed.createComponent(DatasetViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
