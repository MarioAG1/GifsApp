import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = []

  get tagsHistory() {
    //Importante cada vez que hagas un get hacer un ... para poder mostrar los datos siempre que tenga un private
    return [...this._tagsHistory]
  }

  //Comprobar que ya no existe nada repetido y el maximo de 10 solicitudes a la izquierda
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)
  }

  //Busqueda
  public searchTag(tag: string): void {
    if (tag.length === 0) {
      return
    }
    this.organizeHistory(tag)
  }

}
