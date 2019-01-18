import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersEditorComponent } from './publishers-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

const activatedRouteStub = {
  snapshot: { params: { id: 1 } },
};

describe('PublishersEditorComponent', () => {
  let component: PublishersEditorComponent;
  let fixture: ComponentFixture<PublishersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersEditorComponent ],
      imports: [ ReactiveFormsModule, RouterModule, HttpClientModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
