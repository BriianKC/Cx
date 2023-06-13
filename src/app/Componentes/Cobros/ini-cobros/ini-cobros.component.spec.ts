import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniCobrosComponent } from './ini-cobros.component';

describe('IniCobrosComponent', () => {
  let component: IniCobrosComponent;
  let fixture: ComponentFixture<IniCobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniCobrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
