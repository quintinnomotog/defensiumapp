import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaultPage } from './vault.page';

describe('VaultPage', () => {
  let component: VaultPage;
  let fixture: ComponentFixture<VaultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
