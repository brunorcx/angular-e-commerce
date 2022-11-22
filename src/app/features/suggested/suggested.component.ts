import { Component, EventEmitter, OnInit } from '@angular/core';
import { __makeTemplateObject } from 'tslib';
import { TagsService } from '../../core/services/tags.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  rating: number;
  img: string;
  tags: string[];
  mall: string;
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
  allProducts: Product[];
  filteredProducts: Product[];
  filteredByTags: Product[];
  tagsSelected: string[];
  showProducts: ShowProducts;
  searchValue: string = '';
  sortType: string;
  arrow: string;

  constructor(public tags: TagsService, private http: HttpClient) {
    this.allProducts = [];
    this.filteredProducts = this.allProducts;
    this.filteredByTags = [];
    this.tagsSelected = [];
    this.showProducts = <ShowProducts>{
      carnes: [],
      hortifruti: [],
      padaria: [],
    };
    this.sortType = 'Ordenar por:';
    this.arrow = 'arrow_drop_down';
  }
  ngOnInit(): void {
    this.tags.setTags(['Carnes', 'Hortifruti', 'Padaria']);
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
        this.filterProductsByTag(data);
      }
    });
    this.showSpinner(true);
    this.http.get<Product[]>('http://localhost:3333/products').subscribe((data) => {
      for (const prod of data) {
        if (
          prod.img.indexOf('sem-imagem.png') === -1 &&
          prod.img.indexOf('carnes-aves-e-peixes_ind.jpg') === -1 &&
          prod.img.indexOf('feira_ind.jpg') === -1 &&
          prod.img.indexOf('padaria_ind.jpg') === -1
        ) {
          this.allProducts.push(prod);
          this.showProducts[prod.tags[0].toLowerCase() as keyof ShowProducts].push(prod);
        }
      }
      this.showSpinner(false);
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
  checkFilteredTags() {
    return this.tagsSelected.length > 0;
  }
  searchProducts(searchValue: string) {
    let filteredBySearch: Product[] = [];
    if (searchValue.length > 0) {
      this.filteredByTags.filter((product) => {
        if (this.localeContains(product.name.toLowerCase(), searchValue.toLowerCase())) {
          filteredBySearch.push(product);
        }
      });
      if (filteredBySearch.length > 0) {
        this.filteredProducts = filteredBySearch;
      } else this.filteredProducts = [];
    } else {
      this.filterProductsByTag(this.tagsSelected);
    }
  }
  filterProductsByTag(tags: string[]) {
    this.showSpinner(true);
    setTimeout(() => {
      if (tags.length > 0) {
        this.filteredProducts = this.showProducts[tags[0].toLowerCase() as keyof ShowProducts];
        this.filteredByTags = this.filteredProducts;
      } else {
        this.filteredProducts = this.allProducts;
        this.filteredByTags = this.filteredProducts;
      }
      this.showSpinner(false);
    });
    // Add sort based on what has been chosen
    // this.http.get<Product[]>('http://localhost:3333/products', { params: { tags: tags } })
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
  showSpinner(show: boolean) {
    let el = document.getElementById('loading');

    if (el) {
      if (show) {
        el.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      } else {
        el.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  }

  localeContains = function (str: string, sub: string) {
    if (sub === '') return true;
    if (!sub || !str.length) return false;
    if (sub.length > str.length) return false;
    //prettier-ignore
    let ascii = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return ascii(str).includes(ascii(sub));
  };
}
