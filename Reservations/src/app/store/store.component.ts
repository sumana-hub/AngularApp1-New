import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";

@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    selectedCategory: string | undefined;
    productsPerPage = 4;
    selectedPage = 1;
    pageNumbers: number[] = [];

    constructor(private repository: ProductRepository,
                private cart: Cart,
                private router: Router) { 
        this.updatePageNumbers(); // Initialize the page numbers array
    }

    get products(): Product[] {
        let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    get categories(): string[] {
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
        this.selectedPage = 1;
        this.updatePageNumbers(); // Update the page numbers whenever the category changes
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.selectedPage = 1;
        this.updatePageNumbers(); // Update page numbers whenever the page size changes
    }

    updatePageNumbers() {
        const pageCount = Math.ceil(
            this.repository.getProducts(this.selectedCategory).length / this.productsPerPage
        );
        this.pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.router.navigateByUrl("/cart");
    }
}
