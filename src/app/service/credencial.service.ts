import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CredencialModel } from '../model/credencial.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialService {

  private httpClient = inject(HttpClient);

  private ENDPOINT = "/credencial";

  private ENDPOINT_DESCRIPTOGRAFAR = "/descriptografar";

  constructor() { }

  // "http://localhost:8080/defensium/credencial"
  public findAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.url_api.concat(this.ENDPOINT));
  }

  public create(credencialModel: CredencialModel): Observable<any> {
    return this.httpClient.post<any>(environment.url_api.concat(this.ENDPOINT), credencialModel);
  }

  public getRecuperarSenha(codePublic: any): Observable<any> {
    return this.httpClient.post<any>(environment.url_api.concat(this.ENDPOINT.concat(this.ENDPOINT_DESCRIPTOGRAFAR)), codePublic);
  }

}
