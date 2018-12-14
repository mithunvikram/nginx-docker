import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { OrderDetailComponent } from './order-detail.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import {MatStepperModule} from '@angular/material/stepper';
import {OrderDetailService} from './order-detail.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkDetailRowDirective} from '../directive/cdk-detail-row.directive';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'order-detail',
        component: OrderDetailComponent,
      }
    ]),
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    CdkTableModule,
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
    MatStepperModule,
    Ng4LoadingSpinnerModule.forRoot()
    ],
  declarations: [
    OrderDetailComponent, CdkDetailRowDirective

  ],
  exports: [CdkDetailRowDirective],
  providers: [OrderDetailService]
})
export class OrderDetailModule { }
