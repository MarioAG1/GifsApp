import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = []
  private apiKey: string = "xvCPmpylb87lU4q42onwNAAidChHpaj4"
  private serviceUrl: string = "https://api.giphy.com/v1/gifs"

  constructor(private http: HttpClient) { }

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
  public async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) {
      return
    }
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)


    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        console.log(resp)
      })

  }

}
