import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service'

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html'
})

export class SearchBoxComponent {

  //Obtener la referncia local es un arreglo
  @ViewChild("txtTagInput")
  //La exclamacion es para decir que siempre existira ese valor
  public tagInput!: ElementRef<HTMLInputElement>;

  //Inyectar el servicio
  constructor(private gifsService: GifsService) {

  }

  // searchTag(newtag: string)
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = "";
  }

}
