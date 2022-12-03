import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, sequence } from '@angular/animations';

interface Description {
  about: string[];
  products: string[];
  usability: string[];
  malls: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    trigger('changeDivDimension', [
      transition(
        'initial<=>final',
        sequence([
          style({
            opacity: 0,
            transform: 'translateX(50px)',
          }),
          animate(
            '0.4s',
            style({
              opacity: 1,
              transform: 'translateX(0px)',
            })
          ),
        ])
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  subTitle: string;
  description: Description;
  currentDescription: string[];
  animationState: string;

  constructor() {
    this.subTitle = 'Sobre';
    this.animationState = 'initial';
    this.description = {
      about: [
        'Este sistema web foi criado com o intuito de reunir dinamicamente os dados referentes aos produtos dos' +
          ' supermercados em Boa vista em um só ambiente.' +
          ' Além disso, mostra quais são os produtos mais baratos e permite a sua busca por nomes. Espera-se que este' +
          ' projeto seja útil para o consumidor ao comprar produtos e o auxilie a economizar tanto quanto possível.',

        'Futuramente será implementado uma função para fazer pedidos diretamente pelo sistema e receber em casa!',

        ' Os botões abaixo mostram a sua utilização, como os produtos foram coletados e quais mercados foram escolhidos' +
          ' para extrair as informações necessárias.',
      ],
      products: [
        'Os produtos são organizados em três categorias: Carnes, Hortifruti e Padaria. Essa foi uma' +
          ' limitação escolhida para se ter um projeto com caso de teste razoável. No entanto, o script' +
          ' responsável por pegar esses dados foi criado de modo geral e é capaz de varrer todos os produtos dos sites' +
          ' escolhidos. Cada produto aqui presente contém dados reais originários dos seu respectivos mercados.',

        'Os dados são armazenados em um banco de dados próprio com as informações já tratadas para poder exibi-las na' +
          ' página de produtos.',

        'Dentro de cada container de produto é possível ver a logo no topo, representando de qual mercado ele pertence.' +
          ' As estrelas amarelas representam um futuro recurso, o qual o usuário poderá avaliar o produto com nota' +
          ' entre 1-5.',
      ],
      usability: [
        'A navegação é feita pelo header (localizado no topo da página com fundo preto) que contém rotas para' +
          ' as seguintes páginas:',

        'Home - Página principal que mostra informações sobre o sistema, basta selecionar os botões abaixo dessa' +
          ' dessa mensagem para visualizar os tópicos que representam cada botão.',

        'Produtos - Selecione a categoria desejada no lado esquerdo da tela ou pelo menu hambúrguer. No momento,' +
          ' apenas uma categoria por vez pode ser selecionada.' +
          ' No campo de busca digite o nome do produto e aperte a tecla Enter ou clique na lupa. No lado superior' +
          ' direito é possível ordenar os produtos por preço ou ordem alfabética',

        'Super Mercados - Contém o três supermercados escolhidos para coleta de informações dos produtos.' +
          ' Clique no super mercado para visualizar produtos oriundos somente deste mercado desejado.' +
          ' Recarregue a página para mostrar todos os produtos de todos os supermercados novamente',
      ],
      malls: [
        'Três supermercados foram definidos para este projeto, são eles: Gavião, Goiana e Atacadão.' +
          ' Foram escolhidos por possuírem sites que contenham produtos à venda e estarem localizados em Boa vista.',

        'Para cada site existe um script que leva em consideração como esses dados são organizados. Assim, através de' +
          ' uma varredura completa para cada domínio, é extraído nomes, preços e imagens dos seus respectivos produtos.' +
          ' Isso significa que este ambiente se manterá atualizado conforme novas mudanças ocorram nos seus sites' +
          ' originais.',
      ],
    };
    this.currentDescription = this.description.about;
  }

  ngOnInit(): void {}
  changeDescription(subTitle: string, property: string) {
    this.subTitle = subTitle;
    this.currentDescription = this.description[property as keyof Description];
    this.changeState();
  }

  changeState() {
    this.animationState = this.animationState === 'initial' ? 'final' : 'initial';
  }
}
