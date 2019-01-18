import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperEditorComponent } from './developer-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const activatedRouteStub = {
  snapshot: { params: { id: 1 } },
};

describe('DeveloperEditorComponent', () => {
  let component: DeveloperEditorComponent;
  let fixture: ComponentFixture<DeveloperEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperEditorComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule, ReactiveFormsModule, RouterModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
