import { Component, Input, OnInit } from '@angular/core';
import { Dataset } from 'src/app/core/models/dataset.model';
import { DatasetService } from 'src/app/core/services/dataset.service';

@Component({
  selector: 'app-dataset-view-details',
  templateUrl: './dataset-view-details.component.html',
  styleUrls: ['./dataset-view-details.component.css']
})
export class DatasetViewDetailsComponent implements OnInit {

  @Input()
  datasetId: number;
  dataset: Dataset;
  constructor(private datasetService: DatasetService) { }

  ngOnInit(): void {
    this.datasetService.getById(this.datasetId).subscribe(data => {
      if (!data) return;
      this.dataset = data;
    })
  } 
}
