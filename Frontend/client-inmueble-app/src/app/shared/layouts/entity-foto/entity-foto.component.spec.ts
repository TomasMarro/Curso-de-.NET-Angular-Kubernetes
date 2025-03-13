import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFotoComponent } from './entity-foto.component';

describe('EntityFotoComponent', () => {
  let component: EntityFotoComponent;
  let fixture: ComponentFixture<EntityFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityFotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
