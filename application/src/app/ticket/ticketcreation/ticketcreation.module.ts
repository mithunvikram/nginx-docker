import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketcreationComponent } from './ticketcreation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileUploadModule } from 'ng2-file-upload';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketCreationService } from './ticketcreation.service';
import { AuthGuard } from '../../login/auth.guard';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'ticketcreation',
                component: TicketcreationComponent,
                canActivate: [AuthGuard]
            }
        ]),
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        SidenavModule,
        MatPaginatorModule,
        FileUploadModule
    ],
    declarations: [
        TicketcreationComponent
    ],
    entryComponents: [
        AlertDialogComponent
    ],
    providers: [TicketCreationService]
})
export class TicketCreationModule { }
