import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPublishComponent } from './ad-publish.component';

describe('AdPublishComponent', () => {
  let component: AdPublishComponent;
  let fixture: ComponentFixture<AdPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdPublishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
