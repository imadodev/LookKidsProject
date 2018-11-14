
import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector: 'tomorrowproduct',
    templateUrl: 'Home/tomorrow.html'

})
export class ToMorrowProductComponent implements OnInit{
    product:any[]=[];  
    constructor(private lookKids : LookKidsService ) {
    }
    ngOnInit(): void {
        this.lookKids.getToMorrowProduct().subscribe(data => {
            this.product=data;
        });     
    }
}