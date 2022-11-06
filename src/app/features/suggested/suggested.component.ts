import { Component, EventEmitter, OnInit } from '@angular/core';
import { __makeTemplateObject } from 'tslib';
import { TagsService } from '../../core/services/tags.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  rating: number;
  img: string;
  tags: string[];
}
interface ShowProducts {
  carnes: Product[];
  hortifruti: Product[];
  padaria: Product[];
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
      transition('void <=> *', animate(150)),
    ]),
  ],
})
export class SuggestedComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  filteredBySearch: Product[];
  filteredByTags: Product[];
  tagsSelected: string[];
  showProducts: ShowProducts;
  searchValue: string = '';
  goiProds$: Observable<Product[]>;
  filteredProdsEmit: EventEmitter<Product[]>;
  sortType: string;
  arrow: string;

  constructor(public tags: TagsService, private http: HttpClient) {
    this.products = [
      {
        name: 'Product 1',
        price: 50.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 4.5,
        img: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Legumes, verduras e vegetais'],
      },
      {
        name: 'Product 2',
        price: 60.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 3,
        img: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Frutas'],
      },
      {
        name: 'Product 3',
        price: 70.0,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio.',
        rating: 2.5,
        img: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Leite e derivados'],
      },
      {
        name: 'Product 4',
        price: 48.98,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 2,
        img: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Carnes e ovos', 'Frutas'],
      },
      {
        name: 'Product 5',
        price: 25.77,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
        rating: 1,
        img: 'assets/images/products/arroz.png',
        tags: ['Carboidratos', 'Frutas'],
      },
    ];
    this.filteredProducts = this.products;
    this.filteredBySearch = [];
    this.filteredByTags = [];
    this.tagsSelected = [];
    this.showProducts = <ShowProducts>{};
    this.goiProds$ = new Observable<Product[]>();
    this.filteredProdsEmit = new EventEmitter<Product[]>();
    this.sortType = 'Ordenar por:';
    this.arrow = 'arrow_drop_down';
  }
  ngOnInit(): void {
    this.tags.setTags([
      'Carnes',
      'Hortifruti',
      'Padaria',
      'Leite e derivados',
      'Açúcares e doces',
    ]);
    // 'Carboidratos',
    // 'Legumes, verduras e vegetais',
    // 'Frutas',
    // 'Leite e derivados',
    // 'Carnes e ovos',
    // 'Leguminosas e oleaginosas',
    // 'Óleos e gorduras',
    // 'Açúcares e doces',
    //Reset selected tags after changing routes
    this.tags.setSelectTags([]);

    this.tags.getCurrentTags.subscribe((data) => {
      if (data) {
        this.tagsSelected = data;
        this.filterProductsByTag();
      }
    });

    this.goiProds$ = this.http.get<Product[]>('http://localhost:3333/products');
    this.goiProds$.subscribe((data) => {
      console.log(data);
      for (const prod of data) {
        if (prod.img.indexOf('sem-imagem.png') === -1) this.products.push(prod);
      }
    });
    this.filteredProdsEmit.subscribe((data) => {
      if (this.tagsSelected.length === 1) {
        // prettier-ignore
        this.showProducts[this.tagsSelected[0].toLowerCase() as keyof ShowProducts] = data;
        console.log(this.showProducts.carnes);
      } else this.showProducts = <ShowProducts>{};
    });
  }

  counter(rating: number) {
    let arrayRating: number[] = [];
    for (let i = 0; i < rating; i++) {
      //check if rating is a float
      arrayRating.push(i + 1);
    }
    if (rating % 1 !== 0) arrayRating.push(6);

    return arrayRating;
  }
  checkFilteredTags(tags: ShowProducts) {
    return Object.values(tags).length > 0;
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
      this.filteredProdsEmit.emit(this.filteredProducts);
      if (this.tagsSelected.length > 0) {
        this.filteredProducts = this.filteredByTags;
        this.filteredProdsEmit.emit(this.filteredProducts);
      }
    } else {
      currentProducts.filter((product) => {
        //filter products and assign to filteredProducts
        if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.filteredBySearch.push(product);
        }
      });

      this.filteredProducts = this.filteredBySearch;
      this.filteredProdsEmit.emit(this.filteredProducts);
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
      let filteredProductsByCategory: Product[] = [];
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
        this.filteredProdsEmit.emit(this.filteredProducts);
      } else {
        this.filteredProducts = filteredProductsByCategory;
        this.filteredProdsEmit.emit(this.filteredProducts);
      }
    } else {
      this.searchProducts(this.searchValue);
    }
    this.filteredByTags = this.filteredProducts;
    // console.log(['filteredByTags:', this.filteredByTags]);
  }
  sortByName(type: string) {
    this.sortType = 'Nome';
    this.arrow = 'arrow_drop_down';
    if (type === 'asc') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.arrow = 'arrow_drop_up';
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
  sortByPrice(type: string) {
    this.sortType = 'Preço';
    this.arrow = 'arrow_drop_down';
    if (type === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else {
      this.arrow = 'arrow_drop_up';
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }
}
