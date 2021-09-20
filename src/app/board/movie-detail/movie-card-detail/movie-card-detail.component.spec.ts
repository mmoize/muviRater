import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardDetailComponent } from './movie-card-detail.component';

describe('MovieCardDetailComponent', () => {
  let component: MovieCardDetailComponent;
  let fixture: ComponentFixture<MovieCardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
