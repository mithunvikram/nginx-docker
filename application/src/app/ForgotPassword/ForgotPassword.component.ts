import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from './ForgotPassword.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  data: any = {};
  spinnerlogo = false;
  errorDiagnostic: string;
  urlDirect: string;
  submitted = false;
  public token: any;
  public users: any;
  public updateduser: any;
  @ViewChild('ForgotPassword')
  ForgotPassword: ModalComponent;

  constructor(private route: ActivatedRoute, private forgotservice: ForgotPasswordService, private router: Router) { }
 
  ngOnInit() {
    this.users = [];
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.forgotservice.updatepassword(this.token).subscribe(data => {
      this.users.push(data);
    }, error => {
    });
  }


  onSubmit() {
    this.spinnerlogo = true;
    this.submitted = true;
    this.errorDiagnostic = null;
    this.users.forEach(element => {
      element.forEach(user => {
        user.password = this.data.confirmpassword;
      });
    });
    this.users.forEach(test => {
      this.updateduser = test;
    });
    this.forgotservice.updateUser(this.updateduser).subscribe(data => {
      this.router.navigate(['']);
    }, error => {
    });
  }
}
