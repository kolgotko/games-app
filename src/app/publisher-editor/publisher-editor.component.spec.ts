import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherEditorComponent } from './publisher-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const activatedRouteStub = {
  snapshot: { params: { id: 1 } },
};

describe('PublisherEditorComponent', () => {
  let component: PublisherEditorComponent;
  let fixture: ComponentFixture<PublisherEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherEditorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
