import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InidetallesComponent } from './inidetalles.component';

describe('InidetallesComponent', () => {
  let component: InidetallesComponent;
  let fixture: ComponentFixture<InidetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InidetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InidetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
