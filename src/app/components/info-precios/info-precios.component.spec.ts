import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPreciosComponent } from './info-precios.component';

describe('InfoPreciosComponent', () => {
  let component: InfoPreciosComponent;
  let fixture: ComponentFixture<InfoPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
