import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersEditorComponent } from './developers-editor.component';

describe('DevelopersEditorComponent', () => {
  let component: DevelopersEditorComponent;
  let fixture: ComponentFixture<DevelopersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
