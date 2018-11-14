import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
import { LookKidsService } from './LookKids-Service';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { retry } from 'rxjs/operators/retry';
import { CartItem } from "../Model/cart-item.model";
import { DeliveryOption } from "../Model/delivery-option.model";
import { ShoppingCart } from "../Model/shopping-cart.model";
import { User } from "../Model/user.model";
import { StorageService } from "./storage.service";
import { DeliveryOptionsDataService } from "./delivery-options.service";
import { Observer } from "rxjs/Observer";

const CART_KEY = "cart";
const USER_KEY="user";
@Injectable()
export class ShoppingCartService {
  private storage: Storage;
  private products: any[]=[];
  private deliveryOptions: DeliveryOption[];
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private subuser: Observable<User>;
  private myuser: Observer<User>;
  constructor(private storageService: StorageService,private _lookKids : LookKidsService,private deliveryOptionsService: DeliveryOptionsDataService) { 
    this._lookKids.getAllSubUniver().subscribe(data =>this.products=data); 
    this.storage = this.storageService.get();  
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options); 
    console.log("observer","test");
    this.subuser = new Observable<User>((observer: Observer<User>) => {
      
     this.myuser=observer;
    });
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });      
       
  }
  private calculateCart(cart: ShoppingCart): void { 
    console.log("carte",cart);
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.products.find((p) => p.ProductSubUniverId === item.productId).PriceTtc)
                          .reduce((previous, current) => previous + current, 0);
    cart.deliveryTotal = cart.deliveryOptionId ?
                          this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
                          0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }
  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }
  public addItem(product: any, quantity: number): void {  
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.productId === product.ProductSubUniverId);  
    if (item === undefined) {
      item = new CartItem();
      item.productId = product.ProductSubUniverId;
      cart.items.push(item);
    }
    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }
  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();    
     const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    return cart;
}
private save(cart: ShoppingCart): void {
  this.storage.setItem(CART_KEY, JSON.stringify(cart));
}
public saveuser(user: any): void {
  this.storage.setItem(USER_KEY, JSON.stringify(user));
}
public getuser(): any {
 return this.storage.getItem(USER_KEY);
}
public logout(): void {
  console.log("datastor","data");
  var data= this.storage.removeItem(USER_KEY);
  
 }
public get(): Observable<ShoppingCart> {
  return this.subscriptionObservable;
}
private dispatch(cart: ShoppingCart): void {
  this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
        }
      });
}

}