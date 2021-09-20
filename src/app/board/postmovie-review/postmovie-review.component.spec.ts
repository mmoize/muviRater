import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmovieReviewComponent } from './postmovie-review.component';

describe('PostmovieReviewComponent', () => {
  let component: PostmovieReviewComponent;
  let fixture: ComponentFixture<PostmovieReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostmovieReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
