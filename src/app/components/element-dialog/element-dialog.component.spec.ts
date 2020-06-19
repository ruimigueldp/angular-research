import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDialogComponent } from './element-dialog.component';

describe('ElementDialogComponent', () => {
  let component: ElementDialogComponent;
  let fixture: ComponentFixture<ElementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
