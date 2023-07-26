import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html'
})

export class SearchBoxComponent {

  //Obtener la referncia local es un arreglo
  @ViewChild("txtTagInput")

  //La exclamacion es para decir que siempre existira ese valor
  public tagInput!: ElementRef<HTMLInputElement>;

  // searchTag(newtag: string)
  searchTag() {
    const newTag = this.tagInput.nativeElement.value

    console.log(newTag);
  }
}
