import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './compoment/app.component';
import { LookKidsService } from './compoment/Service/LookKids-Service';
import { ShoppingCartService } from './compoment/Service/shopping-cart-service';
import { LocalStorageServie, StorageService } from "./compoment/Service/storage.service";
import { DeliveryOptionsDataService } from './compoment/Service/delivery-options.service';
import {ProductHomeComponent} from './compoment/producthome.component';
import{ProductSubUniverComponent} from  './compoment/productsubuniver.component';
import{ProductDetailsComponent} from  './compoment/productdetails.component';
import{FlashProductComponent} from  './compoment/flashproduct.component';
import{ToMorrowProductComponent} from  './compoment/tomorrowproduct.component';
import{FuturProductComponent} from  './compoment/futurproduct.component';
import{UserComponent} from './compoment/user.component';
import{SlideComponent} from './compoment/slide.component';
import{LetfMenu} from './compoment/leftmenu.component';
import{CardComponent} from './compoment/card.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,       
        RouterModule.forRoot([ 
            { path: '', redirectTo: '/producthomecomponent', pathMatch: 'full' },       
            { 
             path: 'productsubunivercomponent/:id', 
             component: ProductSubUniverComponent
             },
             { 
                path: 'productdetailcomponent/:id', 
                component: ProductDetailsComponent
            },
            {
                path: 'producthomecomponent',
                component: ProductHomeComponent
            },
           
            {
                path: 'appcomponent',
                component: AppComponent
            },
            {
                path: 'flashcomponent',
                component: FlashProductComponent
            },
            {
                path: 'tomorrowcomponent',
                component: ToMorrowProductComponent
            },
            {
                path: 'futurcomponent',
                component: FuturProductComponent
            },
            {
                path: 'usercomponent',
                component: UserComponent
            },
            {
                path: 'slidecomponent',
                component: SlideComponent
            },
            {
                path: 'leftmenucomponent',
                component: LetfMenu
            },
            {
                path: 'cardcomponent',
                component: CardComponent
            },
            
            


            
        ])
    ],
    declarations: [AppComponent,ProductSubUniverComponent,ProductHomeComponent,ProductDetailsComponent,FlashProductComponent,ToMorrowProductComponent,
                   FuturProductComponent,UserComponent,SlideComponent,LetfMenu,CardComponent],
    bootstrap: [AppComponent],
    providers: [
        LookKidsService,
        DeliveryOptionsDataService,
        LocalStorageServie,
        { provide: StorageService, useClass: LocalStorageServie },
        {
        deps: [StorageService,LookKidsService, DeliveryOptionsDataService],
        provide: ShoppingCartService,
        useClass: ShoppingCartService
        }    
    ]
})
export class AppModule {}
