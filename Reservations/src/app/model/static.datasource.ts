import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Observable, from } from "rxjs";
import { Order } from "./order.model";

@Injectable({ providedIn: 'root' })
export class StaticDataSource {
  private products: Product[] = [
    new Product(1, "timeslot 1", "area 1", "timeslot 1 (area 1)", 100),
    new Product(2, "timeslot 2", "area 1", "timeslot 2 (area 1)", 100),
    new Product(3, "timeslot 3", "area 1", "timeslot 3 (area 1)", 100),
    new Product(4, "timeslot 1", "area 2", "timeslot 1 (area 2)", 100),
    new Product(5, "timeslot 2", "area 2", "timeslot 2 (area 2)", 100),
    new Product(6, "timeslot 3", "area 2", "timeslot 3 (area 2)", 100),
    new Product(7, "timeslot 1", "area 3", "timeslot 1 (area 3)", 100),
    new Product(8, "timeslot 2", "area 3", "timeslot 2 (area 3)", 100),
    new Product(9, "timeslot 3", "area 3", "timeslot 3 (area 3)", 100),
    new Product(10, "timeslot 1", "area 4", "timeslot 1 (area 4)", 100),
    new Product(11, "timeslot 2", "area 4", "timeslot 2 (area 4)", 100),
    new Product(12, "timeslot 3", "area 4", "timeslot 3 (area 4)", 100)
  ];

  getProducts(): Observable<Product[]> {
    return from([this.products]);
  }

  saveOrder(order: Order): Observable<Order> {
    console.log(JSON.stringify(order));
    return from([order]);
  }
}
