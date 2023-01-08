import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from './app-routing.module';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {httpInterceptorProviders} from './helpers/http.interceptor';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {ClassPlannerComponent} from './class-planner/class-planner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClassPlannerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    RouterOutlet,
    MatSlideToggleModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    DragDropModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
