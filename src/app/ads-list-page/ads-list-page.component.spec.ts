import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsListPageComponent } from './ads-list-page.component';

describe('AdsListPageComponent', () => {
  let component: AdsListPageComponent;
  let fixture: ComponentFixture<AdsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
