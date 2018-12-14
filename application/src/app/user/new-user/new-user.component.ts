import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IRole } from '../user-role/IRole';
import { UserService } from '../user.service';
import { Iuser } from '../Iuser';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrganization } from '../../organization/IOrganization';
import { OrganizationService } from '../../organization/organization.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  screensForAction = ['Dashboard', 'Orders', 'Purchase Orders', 'Tickets', 'Invoices', 'Shipments', 'Inventory', 'Users'];

  public roles: IRole[] = [];
  public usrerole: IRole;
  public users: Iuser = {
    'uuid': '',
    'firstname': '',
    'lastname': '',
    'email': '',
    'rol': '',
    'position': '',
    'userimage': '',
    'username': '',
    'password': '',
    'organization': [],
    'Authorities': []
  };

  public orgUUID = '';
  public updateorganization: any;
  public allowedScreens = [];
  public duplicateuser = false;
  public organizationlist;
  public adminrole = false;
  public organization: IOrganization = {
    'id': 0,
    'uuid': '',
    'organizationname': '',
    'orgImage': '',
    'PolypmCustomerCode': ''
  };
  public assignedRole: {
    role: '',
    uuid: ''
  };
  public Role = {
    'role': '',
    'uuid': ''
  };
  public updaterole: any;
  public userrole: any;
  public userroleuuid: any;
  public filterrole: any[];
  public update = false;
  public orgid: any;
  public orgName: any;
  public selected2 = {
    'id': 0,
    'uuid': '',
    'organizationname': '',
    'orgImage': '',
    'PolypmCustomerCode': ''
  };
  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute, private organizationService: OrganizationService) {

  }
  public email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
    }
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.Authorities[0].role === 'ADMIN') {
      this.adminrole = true;
    }
    if (this.orgUUID) {
      this.getUserRoleList();
    }
    this.getUserRoleList();
    this.getAllOrganization();
    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      if (uuid !== undefined) {
        this.update = true;
        this.getUserDetails(uuid);
      }
    });
  }

  getAllOrganization() {
    this.organizationService.getAllOrganization().subscribe(
      data => {
        this.organizationlist = data;
      },
      error => {
      }
    );
  }

  organizationchanged(event) {
    this.organizationlist.forEach(element => {
      if (event.value === element.organizationname) {
        this.updateorganization = element.uuid;
      }
    });
  }

  getUserRoleList() {
    this.roles = [];
    if (this.orgUUID) {
      this.userService.getAllUserRoleByOrg(this.orgUUID).subscribe(
        data => {
          this.roles = data;
          this.filterrole = Array.from(new Set(this.roles.map((itemInArray => itemInArray.role))));
        },
        error => {
        }
      );
    } else {
      this.userService.getAllUserRole().subscribe(
        result => {
          this.usrerole = result;
          this.roles = result;
          this.filterrole = Array.from(new Set(this.roles.map((itemInArray => itemInArray.role))));
        }
      );
    }
  }

  textChanged() {
    if (this.update !== true) {
      this.userService.getUser(this.users.username).subscribe(
        data => {
          if (data === null) {
            this.duplicateuser = false;
          } else {
            this.duplicateuser = true;
          }
        },
        error => {
        }
      );
    }
  }

  omit_special_char(event) {
    let k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32);
  }

  emailvalidate() {

  }

  getUserDetails(uuid) {
    this.orgName = [];
    this.userService.getUserDetails(uuid).subscribe(
      data => {
        this.users = data;
        if (data.organization != null) {
          this.selected2 = data.organization;
        }
        if (data.Authorities[0] !== undefined) {
          this.Role = data.Authorities[0];
          this.assignedRole = data.Authorities[0];
        }
      },
      error => {
      }
    );
  }

  createUser() {
    const userDataToSave = {
      'email': '',
      'username': '',
      'password': '',
      'firstname': '',
      'lastname': '',
      'Authorities': [{
        'uuid': '',
        'role': ''
      }],
      'organizationUuid': ''
    };
    if (this.updaterole !== undefined) {
      this.userrole = this.updaterole.role;
      this.userroleuuid = this.updaterole.uuid;
    }
    if (!this.orgUUID) {
      userDataToSave.email = this.users.email;
      userDataToSave.username = this.users.username;
      userDataToSave.password = this.users.password;
      userDataToSave.firstname = this.users.firstname;
      userDataToSave.lastname = this.users.lastname;
      userDataToSave.Authorities[0].uuid = this.userroleuuid;
      userDataToSave.Authorities[0].role = this.userrole;
      userDataToSave.organizationUuid = this.organization.uuid;
    } else {
      userDataToSave.email = this.users.email;
      userDataToSave.username = this.users.username;
      userDataToSave.password = this.users.password;
      userDataToSave.firstname = this.users.firstname;
      userDataToSave.lastname = this.users.lastname;
      userDataToSave.Authorities[0].uuid = this.userroleuuid;
      userDataToSave.Authorities[0].role = this.userrole;
    }
    this.userService.createUser(userDataToSave).subscribe(
      data => {
        this.router.navigate(['/users']);
      },
      error => {
      }
    );
  }

  getRole(event) {
    this.roles.forEach(element => {
      if (event.value === element.role) {
        this.updaterole = element;
      }
    });
  }

  updateUser() {
    if (this.updaterole !== undefined) {
      this.userrole = this.updaterole.role;
      this.userroleuuid = this.updaterole.uuid;
    }
    // tslint:disable-next-line:prefer-const
    let userDataToSave = {
      'uuid': this.users.uuid,
      'email': this.users.email,
      'username': this.users.username,
      'password': this.users.password,
      'firstname': this.users.firstname,
      'lastname': this.users.lastname,
      'Authorities': [{
        'uuid': this.userroleuuid,
        'role': this.userrole
      }],
      'organizationUuid': this.updateorganization
    };

    this.userService.updateUser(userDataToSave).subscribe(
      data => {
        this.router.navigate(['/users']);
      },
      error => {
      }
    );
  }
}
