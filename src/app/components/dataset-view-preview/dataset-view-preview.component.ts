import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-dataset-view-preview',
  templateUrl: './dataset-view-preview.component.html',
  styleUrls: ['./dataset-view-preview.component.css']
})
export class DatasetViewPreviewComponent implements OnInit {
  @Input()
  datasetId: number;
  datasetPreview?: any;

  constructor(private datasetService: DatasetService) { }
    
  ngOnInit(): void {
    this.datasetService.getFilePreview(this.datasetId).subscribe((data: any) => {
      if (!data || !data.rows || !data.header) {
        console.log("incomplete data")
        return
      }

      this.datasetPreview = { header: data.header, rows: data.rows };
    })
  }
}
