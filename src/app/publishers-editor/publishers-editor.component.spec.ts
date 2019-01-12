import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersEditorComponent } from './publishers-editor.component';

describe('PublishersEditorComponent', () => {
  let component: PublishersEditorComponent;
  let fixture: ComponentFixture<PublishersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersEditorComponent ]
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
