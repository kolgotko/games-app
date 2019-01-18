import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesEditorComponent } from './games-editor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('GamesEditorComponent', () => {
  let component: GamesEditorComponent;
  let fixture: ComponentFixture<GamesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesEditorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
