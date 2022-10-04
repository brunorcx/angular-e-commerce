import { Component, OnInit } from '@angular/core';
import { __makeTemplateObject } from 'tslib';
import { TagsService } from '../../core/services/tags.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

interface Products {
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.less'],
  providers: [TagsService],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(50px)',
          margin: '-30px 0 0 0',
        })
      ),
      transition('void <=> *', animate(250)),
    ]),
  ],
})
export class SuggestedComponent implements OnInit {
  constructor(public tags: TagsService) {
    this.products = [
      {
        name: 'Product 1',
        price: 50.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 4.5,
        image: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Legumes, verduras e vegetais'],
      },
      {
        name: 'Product 2',
        price: 60.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 3,
        image: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Frutas'],
      },
      {
        name: 'Product 3',
        price: 70.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.',
        rating: 2.5,
        image: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Leite e derivados'],
      },
      {
        name: 'Product 4',
        price: 48.98,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 2,
        image: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Carnes e ovos', 'Frutas'],
      },
      {
        name: 'Product 5',
        price: 25.77,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 1,
        image: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Frutas'],
      },
    ];
    this.filteredProducts = this.products;
    this.filteredBySearch = [];
    this.filteredByTags = [];
    this.tagsSelected = [];
  }
  ngOnInit(): void {
    this.tags.setTags([
      'Carboidratos',
      'Legumes, verduras e vegetais',
      'Frutas',
      'Leite e derivados',
      'Carnes e ovos',
      'Leguminosas e oleaginosas',
      'Óleos e gorduras',
      'Açúcares e doces',
    ]);
    //Reset selected tags after changing routes
    this.tags.setSelectTags([]);

    this.tags.getCurrentTags.subscribe((data) => {
      if (data) {
        this.tagsSelected = data;
        this.filterProductsByTag();
      }
    });
  }

  products: Products[] = [];
  filteredProducts: Products[] = [];
  filteredBySearch: Products[] = [];
  filteredByTags: Products[] = [];
  tagsSelected: string[];
  searchValue: string = '';

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
    this.filteredBySearch = [];
    let currentProducts = this.products;

    if (this.tagsSelected.length > 0) {
      currentProducts = this.filteredProducts;
      if (currentProducts.length === 0) currentProducts = this.filteredByTags;
    }
    if (searchValue === '') {
      this.filteredProducts = currentProducts;
      if (this.tagsSelected.length > 0) {
        this.filteredProducts = this.filteredByTags;
      }
    } else {
      currentProducts.filter((product) => {
        //filter products and assign to filteredProducts
        if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.filteredBySearch.push(product);
        }
      });

      this.filteredProducts = this.filteredBySearch;
    }
    if (searchValue !== '') this.filteredBySearch = this.filteredProducts;
    this.searchValue = searchValue;
  }
  filterProductsByTag() {
    let currentProducts = this.products;
    this.filteredByTags = [];

    if (this.filteredBySearch.length > 0) {
      currentProducts = this.filteredProducts;
    }
    if (this.tagsSelected.length > 0) {
      let filteredProductsByCategory: Products[] = [];
      currentProducts.forEach((product) => {
        let i = 0;
        if (this.tagsSelected.length <= product.tags.length) {
          for (const tag of this.tagsSelected) {
            if (product.tags.indexOf(tag) === -1) {
              break;
            }
            i++;
          }
        }
        if (i === this.tagsSelected.length) {
          filteredProductsByCategory.push(product);
        }
      });

      if (filteredProductsByCategory.length > 0) {
        //Remove duplicates
        const uniqueProducts = filteredProductsByCategory.filter(
          (ele, pos) => filteredProductsByCategory.indexOf(ele) == pos
        );
        this.filteredProducts = uniqueProducts;
      } else {
        this.filteredProducts = filteredProductsByCategory;
      }
    } else {
      this.searchProducts(this.searchValue);
    }
    this.filteredByTags = this.filteredProducts;
    // console.log(['filteredByTags:', this.filteredByTags]);
  }
}
