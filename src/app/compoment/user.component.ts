
import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { ShoppingCartService } from './Service/shopping-cart-service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
import { User } from './Model/user.model';
// import { userInfo } from 'os';
@Component({
    selector: 'user-app',
    templateUrl: 'User/user.html',

   
                })
export class UserComponent implements OnInit{
    user:User;
    constructor(private lookKids : LookKidsService,private userinfo : ShoppingCartService,private router:Router  ) {
        this.user=new User();
    }

    ngOnInit(): void {
        
    }
    save(): void {
        // var user=this.lookKids.addUser(this.user)
        // this.userinfo.saveuser(this.user)
        // var data=this.userinfo.getuser();
        // this.router.navigate(['./producthomecomponent']);
        // location.reload();
      }

}