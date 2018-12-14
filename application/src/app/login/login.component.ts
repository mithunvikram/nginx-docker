import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SharedService } from '../shared/shared.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any = {};
  users: any;
  submitted = false;
  spinnerlogo = false;
  errorDiagnostic: string;
  mailerrorDiagnostic: string;
  urlDirect: string;
  @ViewChild('ForgotPassword')
  ForgotPassword: ModalComponent;

  constructor(private router: Router, private authService: LoginService, private sharedService: SharedService) { }

  ngOnInit() {
    this.urlDirect = sessionStorage.getItem('urlDirect');
  }

  onSubmit() {
    this.spinnerlogo = true;
    this.submitted = true;
    this.errorDiagnostic = null;
    this.mailerrorDiagnostic = null;
    this.authService.login(this.data.username, this.data.password)
      .delay(1000)
      .subscribe(data => {
        this.users = data.user;
        console.log('----------beforeifDisableduser-------->>>>', this.users);
        if (this.users.isDisabled.toString() === 'true') {
          console.log('----------Disableduser-------->>>>', this.users);
          let i = 0;
          const timer = setInterval(() => {
            this.errorDiagnostic = 'Invalid username or password.';
            i++;
            if (i === 10) {
              clearInterval(timer);
              this.spinnerlogo = false;
              this.errorDiagnostic = null;
            }
          }, 500);
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          sessionStorage.setItem('token', JSON.stringify(data.token));
          sessionStorage.setItem('dismissOrders', 'false');
          this.spinnerlogo = false;
          if (this.urlDirect !== null) {
            window.location.href = this.sharedService.baseUrl + '/' + this.urlDirect;
          } else { this.router.navigate(['/dashboard']); }
        }
      },
        error => {
          this.submitted = false;
          setInterval(() => {
            this.spinnerlogo = false;
          }, 1000);
          let i = 0;
          const timer = setInterval(() => {
            this.errorDiagnostic = 'Incorrect username or password.';
            i++;
            if (i === 10) {
              clearInterval(timer);
              this.spinnerlogo = false;
              this.errorDiagnostic = null;
            }
          }, 500);

        });

  }

  OpenDialog() {
    this.data.mail = '';
    this.ForgotPassword.open();
  }
  closeOption() {
    this.ForgotPassword.close();
  }
  SendMail() {
    this.ForgotPassword.close();
    this.authService.sendMail(this.data).subscribe(data => {
      if (data === 'Invalid Mail Id') {
        this.mailerrorDiagnostic = data;
      }
      if (data.message === 'Success') {
        this.mailerrorDiagnostic = 'Mail sent successfully';
      }
    }, error => {
      console.log('-------Error------->>>>>>', error);
    });
  }
}
