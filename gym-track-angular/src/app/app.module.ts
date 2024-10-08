import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HighchartsChartModule} from "highcharts-angular";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {CommonModule, DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CodeInputModule,
    FormsModule,
    HighchartsChartModule,
    CommonModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
