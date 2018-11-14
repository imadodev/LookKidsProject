
import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector: 'slideproduct',
    templateUrl: 'Home/slide.html',
 })
export class SlideComponent implements OnInit{
    product:any[]=[]
    countofitem:number
    constructor(private lookKids : LookKidsService ) {
    }
    ngOnInit(): void {  
        this.lookKids.getFlashProduct().subscribe(data => {
            this.product=data;
            this.countofitem=data.length;
        });   
    }
}