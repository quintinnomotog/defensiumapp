import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private httpClient = inject(HttpClient);

  private ENDPOINT = "/pessoa"

  constructor() { }

  public getFindAll(): Observable<any> {
    return this.httpClient.get<any[]>(environment.url_api.concat(this.ENDPOINT));
  }

}
