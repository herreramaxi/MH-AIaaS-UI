import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetViewPreviewComponent } from './dataset-view-preview.component';

describe('DatasetViewPreviewComponent', () => {
  let component: DatasetViewPreviewComponent;
  let fixture: ComponentFixture<DatasetViewPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetViewPreviewComponent]
    });
    fixture = TestBed.createComponent(DatasetViewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
