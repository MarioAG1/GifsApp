import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = []
  private apiKey: string = "xvCPmpylb87lU4q42onwNAAidChHpaj4"
  private serviceUrl: string = "https://api.giphy.com/v1/gifs"

  constructor(private http: HttpClient) {
    this.loadLocalStrorage()
    this.searchTag(this._tagsHistory[0])
  }


  get tagsHistory() {
    //Importante cada vez que hagas un get hacer un ... para poder mostrar los datos siempre que tenga un private
    return [...this._tagsHistory]
  }

  //Guardar en el LocalStorage
  private saveLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this._tagsHistory))
  }

  private loadLocalStrorage():void {
    if(!localStorage.getItem("history")) {
      //Si no hay informacion
      return
    }
    //Obligacion de que siempre hay un dato ! si no, no deja
    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);

  }

  //Comprobar que ya no existe nada repetido y el maximo de 10 solicitudes a la izquierda
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this.saveLocalStorage();
  }


  //Busqueda
  public async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) {
      return
    }
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '50')
      .set('q', tag)



    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data
      })

  }

}
