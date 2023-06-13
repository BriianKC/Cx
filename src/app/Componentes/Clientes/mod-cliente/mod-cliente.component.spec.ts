import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModClienteComponent } from './mod-cliente.component';

describe('ModClienteComponent', () => {
  let component: ModClienteComponent;
  let fixture: ComponentFixture<ModClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
