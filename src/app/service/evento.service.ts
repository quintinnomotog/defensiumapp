import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private credencialAtualizadaSource = new Subject<void>();

  public credencialAtualizada$ = this.credencialAtualizadaSource.asObservable();

  emitirAtualizacaoCredencial() {
    this.credencialAtualizadaSource.next();
  }
  
}
