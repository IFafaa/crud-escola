import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

interface Paginacao {
  indice: number;
  pagina: number;
  limitePagina: number;
}

@Directive({
  selector: '[paginacao]',
})
export class PaginacaoDirective {
  @Input() paginacao!: Paginacao;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.paginacaoLista();
  }

  ngOnChanges(simpleChanges: any) {
    this.paginacaoLista();
  }

  paginacaoLista() {
    if (!this.validaExibicao())
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    else this.renderer.removeStyle(this.el.nativeElement, 'display');
  }

  validaExibicao(): boolean {
    return (
      this.paginacao.indice <
        this.paginacao.limitePagina * (this.paginacao.pagina + 1) &&
      this.paginacao.indice >=
        this.paginacao.limitePagina * (this.paginacao.pagina + 1) -
          this.paginacao.limitePagina
    );
  }
}
