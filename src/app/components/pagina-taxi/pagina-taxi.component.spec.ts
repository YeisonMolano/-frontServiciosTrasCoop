import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTaxiComponent } from './pagina-taxi.component';

describe('PaginaTaxiComponent', () => {
  let component: PaginaTaxiComponent;
  let fixture: ComponentFixture<PaginaTaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaTaxiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
