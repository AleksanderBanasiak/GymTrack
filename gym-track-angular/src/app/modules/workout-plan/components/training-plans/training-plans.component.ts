import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.css']
})
export class TrainingPlansComponent {

  constructor(
    private router: Router
  ) {
  }

  addTraining() {
    this.router.navigate(['add-training']);
  }
}
