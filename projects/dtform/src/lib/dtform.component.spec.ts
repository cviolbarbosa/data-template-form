import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dtformComponent } from './dtform.component';

describe('dtformComponent', () => {
  let component: dtformComponent;
  let fixture: ComponentFixture<dtformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ dtformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(dtformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
