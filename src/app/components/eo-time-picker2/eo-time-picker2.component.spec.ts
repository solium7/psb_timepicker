import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EoTimePicker2Component } from './eo-time-picker2.component';

describe('EoTimePicker2Component', () => {
  let component: EoTimePicker2Component;
  let fixture: ComponentFixture<EoTimePicker2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EoTimePicker2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EoTimePicker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
