import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InipagosComponent } from './inipagos.component';

describe('InipagosComponent', () => {
  let component: InipagosComponent;
  let fixture: ComponentFixture<InipagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InipagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InipagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
