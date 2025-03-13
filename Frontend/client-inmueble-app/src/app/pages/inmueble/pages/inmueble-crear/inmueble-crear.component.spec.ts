import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleCrearComponent } from './inmueble-crear.component';

describe('InmuebleCrearComponent', () => {
  let component: InmuebleCrearComponent;
  let fixture: ComponentFixture<InmuebleCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmuebleCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmuebleCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
