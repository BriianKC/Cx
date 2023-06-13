import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InideudoresComponent } from './inideudores.component';

describe('InideudoresComponent', () => {
  let component: InideudoresComponent;
  let fixture: ComponentFixture<InideudoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InideudoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InideudoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
