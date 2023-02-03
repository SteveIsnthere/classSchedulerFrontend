import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from './app-routing.module';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DragDropModule} from "@angular/cdk/drag-drop";


import {httpInterceptorProviders} from './helpers/http.interceptor';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {ClassPlannerComponent} from './reusable-components/class-planner/class-planner.component';
import {ClassCellComponent} from './reusable-components/class-cell/class-cell.component';
import {RelationCellComponent} from './reusable-components/relation-cell/relation-cell.component';
import {
  RelationDetailDialogComponent
} from './reusable-components/relation-cell/relation-detail-dialog/relation-detail-dialog.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MemberCellComponent} from './reusable-components/member-cell/member-cell.component';
import {MemberPickerComponent} from './reusable-components/member-picker/member-picker.component';
import {MatRadioModule} from "@angular/material/radio";
import {MessagesComponent} from './messages/messages.component';
import {AdminClassPlannerComponent} from './dashboard/admin-class-planner/admin-class-planner.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatListModule} from "@angular/material/list";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {
  ClassBottomSheetComponent
} from './reusable-components/class-cell/class-bottom-sheet/class-bottom-sheet.component';
import {SelfActionsComponent} from "./dashboard/self-actions/self-actions.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatOptionModule} from "@angular/material/core";
import {ForumComponent} from './forum/forum.component';
import { AddMemberComponent } from './dashboard/admin-management/add-member/add-member.component';
import { AdminManagementComponent } from './dashboard/admin-management/admin-management.component';
import {MatStepperModule} from "@angular/material/stepper";
import { DetailViewComponent } from './reusable-components/member-cell/detail-view/detail-view.component';
import { MessageViewComponent } from './reusable-components/member-cell/message-view/message-view.component';
import { ScheduleViewComponent } from './reusable-components/member-cell/schedule-view/schedule-view.component';

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
    RelationDetailDialogComponent,
    ClassBottomSheetComponent,
    SelfActionsComponent,
    ForumComponent,
    AddMemberComponent,
    AdminManagementComponent,
    DetailViewComponent,
    MessageViewComponent,
    ScheduleViewComponent
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
    MatDividerModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatListModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
