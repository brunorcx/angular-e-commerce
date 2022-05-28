import { Component, OnInit } from '@angular/core';

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
        name: 'Product 2',
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
  }

  ngOnInit(): void {}

  products: Products[] = [];

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
    if (searchValue === '') {
      return this.products;
    }
    return this.products.filter((product) => {
      return product.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }
  value = '';
}
