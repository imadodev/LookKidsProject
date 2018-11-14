
import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { ShoppingCartService } from './Service/shopping-cart-service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { ShoppingCart } from "./Model/shopping-cart.model";
import { Route } from '@angular/router/src/config';
@Component({
    selector: 'my-app',
    templateUrl: 'Home/menu.html',  
    
    
    })
export class AppComponent implements OnInit{
   
    public itemCount: any
    public itemUser:string;
    public cart: Observable<ShoppingCart>;
    private cartSubscription: Subscription;
    netImage:any = "images/logo_kids.jpg";
    Product:any;
    loguser:boolean;
    constructor(private lookKids : LookKidsService,private shoppingCartService: ShoppingCartService ,private router:Router) {
    }
    ngOnInit(): void {
        this.lookKids.getAllProduct().subscribe(data => {
            this.Product=data;       
        }); 
       var item= this.shoppingCartService.getuser();
       var data=JSON.parse(item);
       if(data!=null)
       {
        if(data.username!="")
        {
           this.itemUser=data.username;
           this.loguser=true;
        }
        else
        {
           this.itemUser="Mon Compte";
           this.loguser=false;
        }
       }
       else
       {
           this.loguser=false;
           this.itemUser="Mon Compte";
       }    
        this.cart = this.shoppingCartService.get();
        this.cartSubscription = this.cart.subscribe((cart) => {
            var myCart=cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
            if(myCart==0)
            {
                this.itemCount="Panier";
            }
            else
            {
                this.itemCount = myCart;
            }
           
          });

    }
    public logout() {
        this.shoppingCartService.logout();
        this.router.navigate(['./producthomecomponent']);
        location.reload();
    }
}