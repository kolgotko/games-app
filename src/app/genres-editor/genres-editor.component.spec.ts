import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresEditorComponent } from './genres-editor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('GenresEditorComponent', () => {
  let component: GenresEditorComponent;
  let fixture: ComponentFixture<GenresEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresEditorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
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
