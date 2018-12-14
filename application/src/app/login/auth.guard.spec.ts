import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
    let service;
    let comp: AuthGuard;
    let fixture: ComponentFixture<AuthGuard>;


    // const router: any = {
    //     // mock properties here
    // };
    // tslint:disable-next-line:prefer-const
    //  routerStub;
    const routerStub = {
        navigate: jasmine.createSpy('navigate').and.returnValue('called')
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
            ],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: APP_BASE_HREF, useValue: '/' }
            ],
        }).compileComponents();
    }));

    beforeEach(inject([Router], (router) => {
        service = new AuthGuard(router);
        // fixture = TestBed.createComponent(AuthGuard);
        // modalComponentFixture = TestBed.createComponent(ModalComponent);
        // comp = fixture.componentInstance;
    }));


    it('should run #canActivate() and check if condition', async () => {
        // const result = canActivate();
        const userdata = {
            username: 'testuser',
            password: 'testpassword'
        };
        sessionStorage.setItem('currentUser', JSON.stringify(userdata));
        service.canActivate();
    });


    it('should run #canActivate() and check else condition', async () => {
        sessionStorage.removeItem('currentUser');
        // comp.router = new router;
        // service.router = Router;
        // console.log('router value in auth guard spec file ------- ', Router);
        service.canActivate();
        // fixture.detectChanges();
        expect(service.router.navigate).toHaveBeenCalledWith(['']);
        // expect()
    });

});
