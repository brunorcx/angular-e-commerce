import { Component } from '@angular/core';

interface Products {
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'angular-e-commerce';
  products: Products[] = [
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
  ];
  counter(rating: number) {
    let arrayRating: number[] = [];
    for (let i = 0; i < rating; i++) {
      //check if rating is a float
      arrayRating.push(i + 1);
    }
    if (rating % 1 !== 0) arrayRating.push(6);

    return arrayRating;
  }
}
