import { NgModule,  NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule , MatSliderModule} from '@angular/material';
import { MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SyncServiceComponent } from './sync-service.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import {SyncService} from './sync-service.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuard } from '../login/auth.guard';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'syncservice',
        component: SyncServiceComponent,
        canActivate: [AuthGuard]
      }
    ]),
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    CommonModule,
    SidenavModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    SyncServiceComponent
  ],
  entryComponents:[AlertDialogComponent],
  bootstrap: [SyncServiceComponent],
  providers: [SyncService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SyncServiceModule { }
