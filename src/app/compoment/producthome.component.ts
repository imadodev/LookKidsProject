
import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    templateUrl: 'Home/product.html'

})
export class ProductHomeComponent implements OnInit{
    product:any[]=[];  
    constructor(private lookKids : LookKidsService ) {
    }
    ngOnInit(): void {
       
        this.lookKids.getAllProduct().subscribe(data => {
            this.product=data
        });     
    }
    public refrech(conn:string) {
      
    }
}