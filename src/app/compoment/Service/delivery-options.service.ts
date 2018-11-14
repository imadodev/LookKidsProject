import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "../Model/delivery-option.model";
import { CachcingServiceBase } from "./caching.service";

@Injectable()
export class DeliveryOptionsDataService extends CachcingServiceBase {
  private deliveryOptions: Observable<DeliveryOption[]>;

  public constructor(private http: HttpClient) {
    super();
  }
  public all(): Observable<DeliveryOption[]> {
    return this.cache<DeliveryOption[]>(() => this.deliveryOptions,
                                        (val: Observable<DeliveryOption[]>) => this.deliveryOptions = val,
                                        () => this.http
                                                  .get<DeliveryOption[]>("./assets/delivery-options.json")
                                                  .map((response) => response.map((item) => {
                                                    let model = new DeliveryOption();
                                                    model.updateFrom(item);
                                                    return model;
                                                  }))); 
  }
}
