import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditorComponent } from './game-editor.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

const activatedRouteStub = {
  snapshot: { params: { id: 1 } },
};

const routerStub = {
  navigate: _ => {},
};

describe('GameEditorComponent', () => {
  let component: GameEditorComponent;
  let fixture: ComponentFixture<GameEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEditorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule, RouterModule, ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router , useValue: routerStub },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
