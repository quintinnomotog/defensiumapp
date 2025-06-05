import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenhaCadastrarPage } from './senha-cadastrar.page';

describe('SenhaCadastrarPage', () => {
  let component: SenhaCadastrarPage;
  let fixture: ComponentFixture<SenhaCadastrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhaCadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
