import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreEditorComponent } from './genre-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('GenreEditorComponent', () => {
  let component: GenreEditorComponent;
  let fixture: ComponentFixture<GenreEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreEditorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEditorComponent);
    component = fixture.componentInstance;

    component.genre = {
      genreId: 1,
      name: 'test genre',
    };

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
