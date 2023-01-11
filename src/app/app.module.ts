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
import {ClassPlannerComponent} from './reusable-compoents/class-planner/class-planner.component';
import { ClassCellComponent } from './reusable-compoents/class-cell/class-cell.component';
import { RelationCellComponent } from './reusable-compoents/relation-cell/relation-cell.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { MemberCellComponent } from './reusable-compoents/member-cell/member-cell.component';
import { MemberPickerComponent } from './reusable-compoents/member-picker/member-picker.component';
import {MatRadioModule} from "@angular/material/radio";
import { MessagesComponent } from './messages/messages.component';
import { AdminClassPlannerComponent } from './dashboard/admin-class-planner/admin-class-planner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClassPlannerComponent,
    ClassCellComponent,
    RelationCellComponent,
    MemberCellComponent,
    MemberPickerComponent,
    MessagesComponent,
    AdminClassPlannerComponent,
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
    MatToolbarModule,
    MatTabsModule,
    MatRadioModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
