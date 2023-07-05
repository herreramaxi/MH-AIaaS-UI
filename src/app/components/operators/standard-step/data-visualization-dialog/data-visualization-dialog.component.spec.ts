import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationDialogComponent } from './data-visualization-dialog.component';

describe('DataVisualizationDialogComponent', () => {
  let component: DataVisualizationDialogComponent;
  let fixture: ComponentFixture<DataVisualizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataVisualizationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataVisualizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
