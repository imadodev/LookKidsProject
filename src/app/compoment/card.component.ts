import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "./Model/cart-item.model";
import { DeliveryOption } from "./Model/delivery-option.model";
import { ShoppingCart } from "./Model/shopping-cart.model";
import { DeliveryOptionsDataService } from "./Service/delivery-options.service";
import { ShoppingCartService } from "./Service/shopping-cart-service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { LookKidsService } from './Service/LookKids-Service';
import { Observer } from "rxjs/Observer";

interface ICartItemWithProduct extends CartItem {
  product: any;
  totalCost: number;
}

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout/card.html"
})
export class CardComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: any[]=[];
  private cartSubscription: Subscription;

  public constructor(private _lookKids : LookKidsService,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    //this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
    this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    this._lookKids.getAllSubUniver().subscribe((products) => {
    this.products = products;
    
    this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.ProductSubUniverId === item.productId);
                              return {
                                ...item,
                                product,
                                totalCost: product.PriceTtc * item.quantity };
                           });
      console.log("item",this.cartItems);
      });
    });
  }
  public removeProductFromCart(product: any): void {
    this.shoppingCartService.addItem(product, -1);
  }
  public addProductToCart(product: any): void {
    this.shoppingCartService.addItem(product, 1);
  }
  public productInCart(product: any): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }
  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
