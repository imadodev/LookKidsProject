import { Component, OnInit, Input } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { ShoppingCartService } from "./Service/shopping-cart-service";
import { ActivatedRoute } from  '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
import { strictEqual } from 'assert';

@Component({
    // selector: 'subUniver',
    templateUrl: './Home/ProductSubUniver/ProductSubUniver.html',
    styleUrls: []
})
export class ProductSubUniverComponent implements OnInit{
    productsubuniver:any[]=[];     
    constructor(
        private lookKids : LookKidsService,
        private shoppingCartService : ShoppingCartService,
        private route: ActivatedRoute
        ){}
    // DataSubUniver:any;
    ngOnInit(): void {  
        const id = +this.route.snapshot.paramMap.get('id');    
        this.lookKids.getSubUniver(id).subscribe(data =>this.getSubUniver(data));        
    };
    getSubUniver(data:any[]): void {
        console.log("data",data);
        this.productsubuniver=data;
      }
    public addProductToCart(product: any): void {
        
        this.shoppingCartService.addItem(product, 1);
    }
}
