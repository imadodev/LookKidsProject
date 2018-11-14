import { Component, OnInit, Input } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { ActivatedRoute } from  '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
import { strictEqual } from 'assert';
@Component({
    // selector: 'subUniver',
    templateUrl: './Home/ProductDetails/ProductDetails.html',
    styleUrls: []
})
export class ProductDetailsComponent implements OnInit{
    productdetail :any;     
    constructor(
        private lookKids : LookKidsService,
        private route: ActivatedRoute
        ){}
    // DataSubUniver:any;
    ngOnInit(): void {  
        const id = +this.route.snapshot.paramMap.get('id');    
        this.lookKids.getProductDetail(id).subscribe(data =>this.getProductDetails(data));        
    };
    getProductDetails(data:any): void {
        this.productdetail=data;
        console.log("ProductDetail",data);
      }
}