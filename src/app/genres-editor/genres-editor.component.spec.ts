import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresEditorComponent } from './genres-editor.component';

describe('GenresEditorComponent', () => {
  let component: GenresEditorComponent;
  let fixture: ComponentFixture<GenresEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
