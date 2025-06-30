import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CategoriaCredencialModel } from '../model/categoria-credencial.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaCredencialService {

  private httpClient = inject(HttpClient);

  private ENDPOINT = "/categoria-credencial";

  constructor() { }

  public getFindAll(): Observable<any> {
    return this.httpClient.get<any>(environment.url_api.concat(this.ENDPOINT));
  }

  public create(categoriaCredencialEntity: any): Observable<any> {
    return this.httpClient.post<any>(environment.url_api.concat(this.ENDPOINT), categoriaCredencialEntity);
  }

}
