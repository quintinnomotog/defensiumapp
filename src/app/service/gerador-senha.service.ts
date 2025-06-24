import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeradorSenhaService {

  constructor() { }

  public gerarSenha(): string {

    const caracteres = {
      maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      minusculas: 'abcdefghijklmnopqrstuvwxyz',
      numeros: '0123456789',
      simbolos: '!@#$%&*()_+-=[]{}|;:,.<>?'
    };

    const comprimentoSenha = 20;

    let senha = [
      this.getRandomChar(caracteres.maiusculas),
      this.getRandomChar(caracteres.minusculas),
      this.getRandomChar(caracteres.numeros),
      this.getRandomChar(caracteres.simbolos)
    ];

    const todosCaracteres =
      caracteres.maiusculas +
      caracteres.minusculas +
      caracteres.numeros +
      caracteres.simbolos;

    for (let i = senha.length; i < comprimentoSenha; i++) {
      senha.push(this.getRandomChar(todosCaracteres));
    }

    return senha.sort(() => Math.random() - 0.5).join('');
  }

  private getRandomChar(string: string): string {
    return string[Math.floor(Math.random() * string.length)];
  }

}
