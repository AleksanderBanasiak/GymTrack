import { Component } from '@angular/core';
import {Route, Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent {

  submitted = false;
  isOkay = true;
  message = '';

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService
  ) {
  }


  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.authService.activateAccount({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated'
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Token has been expired'
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }

}
