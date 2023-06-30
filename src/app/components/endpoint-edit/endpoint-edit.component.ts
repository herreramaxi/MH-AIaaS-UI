import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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
  formGroup?: FormGroup;
  authenticationTypes: any[];
  endpointId: number;

  color: ThemePalette = 'primary';

  constructor(private activatedRoute: ActivatedRoute, private endpointService: EndpointService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.endpointId = +this.activatedRoute.snapshot.params['id'];
    });
  }
}
