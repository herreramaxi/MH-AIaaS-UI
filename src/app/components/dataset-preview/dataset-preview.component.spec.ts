import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetPreviewComponent } from './dataset-preview.component';

describe('DatasetPreviewComponent', () => {
  let component: DatasetPreviewComponent;
  let fixture: ComponentFixture<DatasetPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetPreviewComponent]
    });
    fixture = TestBed.createComponent(DatasetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
