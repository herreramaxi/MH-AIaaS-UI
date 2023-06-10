import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from 'src/app/core/models/endpoint.model';
import { EndpointService } from 'src/app/core/services/endpoint.service';

@Component({
  selector: 'app-endpoint-edit',
  templateUrl: './endpoint-edit.component.html',
  styleUrls: ['./endpoint-edit.component.css']
})
export class EndpointEditComponent implements OnInit {
  endpoint?: Endpoint;
  
  constructor(private activatedRoute: ActivatedRoute, private service: EndpointService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.load(id);
    });
  }

  load(id: number) {
    this.service.getById(id).subscribe(data => {
      this.endpoint = data;
    })
  }

  input = `
  {
    "data": [
      [1,2,3,4,5,6], 
      [7,8,9,0,1,2]
    ]
  }
  `
  endpointResponse?:string;

  test(){
    this.endpointResponse = `{ 
      [
        12345.67,
        2345.98
      ]
    }`
  }
}
