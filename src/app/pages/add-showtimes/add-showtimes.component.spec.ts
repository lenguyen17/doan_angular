import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowtimesComponent } from './add-showtimes.component';

describe('AddShowtimesComponent', () => {
  let component: AddShowtimesComponent;
  let fixture: ComponentFixture<AddShowtimesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShowtimesComponent]
    });
    fixture = TestBed.createComponent(AddShowtimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
