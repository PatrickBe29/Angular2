import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntwurfComponent } from './entwurf.component';

describe('EntwurfComponent', () => {
  let component: EntwurfComponent;
  let fixture: ComponentFixture<EntwurfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntwurfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntwurfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
