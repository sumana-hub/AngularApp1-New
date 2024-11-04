import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { MatPaginator } from "@angular/material/paginator";

@Component({
 templateUrl: "productTable.component.html"
})

export class ProductTableComponent {

 colsAndRows: string[] = ['id', 'timeslot', 'area', 'price', 'buttons'];
 dataSource = new MatTableDataSource<Product>();
 differ: IterableDiffer<Product>;

 @ViewChild(MatPaginator)
 paginator? : MatPaginator

 constructor(private repository: ProductRepository, differs: IterableDiffers) {
 this.differ = differs.find(this.repository.getProducts()).create();
 this.dataSource.data = this.repository.getProducts();
}

 ngDoCheck() {
 let changes = this.differ?.diff(this.repository.getProducts());
 if (changes != null) {
 this.dataSource.data = this.repository.getProducts();
 }
 }

 ngAfterViewInit() {
    if (this.paginator) {
    this.dataSource.paginator = this.paginator;
    }
 }

 deleteProduct(id: number) {
 this.repository.deleteProduct(id);
 }

}