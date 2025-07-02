import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredencialCadastrarPage } from './credencial-cadastrar.page';

describe('CredencialCadastrarPage', () => {
  let component: CredencialCadastrarPage;
  let fixture: ComponentFixture<CredencialCadastrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CredencialCadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
