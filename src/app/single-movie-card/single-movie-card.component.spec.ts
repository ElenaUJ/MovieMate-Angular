import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovieCardComponent } from './single-movie-card.component';

describe('SingleMovieCardComponent', () => {
  let component: SingleMovieCardComponent;
  let fixture: ComponentFixture<SingleMovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleMovieCardComponent]
    });
    fixture = TestBed.createComponent(SingleMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
