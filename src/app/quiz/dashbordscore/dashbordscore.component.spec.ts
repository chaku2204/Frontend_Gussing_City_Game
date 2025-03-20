import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordscoreComponent } from './dashbordscore.component';

describe('DashbordscoreComponent', () => {
  let component: DashbordscoreComponent;
  let fixture: ComponentFixture<DashbordscoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordscoreComponent]
    });
    fixture = TestBed.createComponent(DashbordscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
