import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SenhasPage } from './senhas.page';

describe('SenhasPage', () => {
  let component: SenhasPage;
  let fixture: ComponentFixture<SenhasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
