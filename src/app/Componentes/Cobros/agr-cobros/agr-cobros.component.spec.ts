import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrCobrosComponent } from './agr-cobros.component';

describe('AgrCobrosComponent', () => {
  let component: AgrCobrosComponent;
  let fixture: ComponentFixture<AgrCobrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgrCobrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
