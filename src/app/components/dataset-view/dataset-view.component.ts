import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dataset-view',
  templateUrl: './dataset-view.component.html',
  styleUrls: ['./dataset-view.component.css']
})
export class DatasetViewComponent implements OnInit {
  datasetId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.datasetId = this.route.snapshot.params['id'];
  }

}
