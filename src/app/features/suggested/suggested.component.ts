import { Component, OnInit } from '@angular/core';
import { __makeTemplateObject } from 'tslib';

interface Products {
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.less'],
})
export class SuggestedComponent implements OnInit {
  constructor() {
    this.products = [
      {
        name: 'Product 1',
        price: 50.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 4.5,
        image: 'assets/images/products/arroz.png',
      },
      {
        name: 'Product 10',
        price: 60.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 3,
        image: 'assets/images/products/arroz.png',
      },
      {
        name: 'Product 3',
        price: 70.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.',
        rating: 2.5,
        image: 'assets/images/products/arroz.png',
      },
      {
        name: 'Product 4',
        price: 48.98,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 2,
        image: 'assets/images/products/arroz.png',
      },
      {
        name: 'Product 5',
        price: 25.77,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 1,
        image: 'assets/images/products/arroz.png',
      },
    ];
    this.filteredProducts = [];
  }

  ngOnInit(): void {}

  products: Products[] = [];
  filteredProducts: Products[] = [];

  counter(rating: number) {
    let arrayRating: number[] = [];
    for (let i = 0; i < rating; i++) {
      //check if rating is a float
      arrayRating.push(i + 1);
    }
    if (rating % 1 !== 0) arrayRating.push(6);

    return arrayRating;
  }
  searchProducts(searchValue: string) {
    console.log(searchValue);
    this.filteredProducts = [];
    if (searchValue === '') {
      this.filteredProducts = this.products;
    } else {
      this.products.filter((product) => {
        //filter products and assign to filteredProducts
        if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.filteredProducts.push(product);
        }
      });
      if (this.filteredProducts.length === 0) {
        this.filteredProducts = [];
        const empty: Products = {
          name: 'empty',
          price: 0,
          description: '',
          rating: 0,
          image: '',
        };
        this.filteredProducts.push(empty);
      }
    }
  }
}
