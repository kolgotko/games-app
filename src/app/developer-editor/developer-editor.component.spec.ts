import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperEditorComponent } from './developer-editor.component';

describe('DeveloperEditorComponent', () => {
  let component: DeveloperEditorComponent;
  let fixture: ComponentFixture<DeveloperEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperEditorComponent ]
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
