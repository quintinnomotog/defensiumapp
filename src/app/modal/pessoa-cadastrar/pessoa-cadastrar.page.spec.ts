import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PessoaCadastrarPage } from './pessoa-cadastrar.page';

describe('PessoaCadastrarPage', () => {
  let component: PessoaCadastrarPage;
  let fixture: ComponentFixture<PessoaCadastrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
