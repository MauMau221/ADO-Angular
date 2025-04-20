import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFilmesComponentComponent } from './lista-filmes-component.component';

describe('ListaFilmesComponentComponent', () => {
  let component: ListaFilmesComponentComponent;
  let fixture: ComponentFixture<ListaFilmesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFilmesComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFilmesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
