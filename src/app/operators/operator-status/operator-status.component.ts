import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-operator-status',
  templateUrl: './operator-status.component.html',
  styleUrls: ['./operator-status.component.css']
})
export class OperatorStatusComponent implements OnInit {

  @Input()
  isValid?: boolean;
  @Input()
  message: string;

  ngOnInit(): void {

    this.message = this.message ?? 'Please configure the operator and run it'
  }

  // ngOnChanges(changes: SimpleChanges) {

  //   if (changes['isValid'].currentValue) {
  //     this.isValid = changes['isValid'].currentValue;
  //   }
  //   if (changes['message'].currentValue) {
  //     this.message = changes['message'].currentValue;
  //   }
  //   // You can also use categoryId.previousValue and 
  //   // categoryId.firstChange for comparing old and new values

  // }
}
