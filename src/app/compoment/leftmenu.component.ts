import { Component, OnInit } from '@angular/core';
import { LookKidsService } from './Service/LookKids-Service';
import { Router } from '@angular/router';
import { log } from 'util';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector: 'left-menu',
    templateUrl: 'Home/menu/leftmenu.html',
})
export class LetfMenu implements OnInit{
   
    constructor(private lookKids : LookKidsService ) {
    }
    ngOnInit(): void {   
    }
}