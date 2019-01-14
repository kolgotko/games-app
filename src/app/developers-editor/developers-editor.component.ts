import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';

@Component({
  selector: 'app-developers-editor',
  templateUrl: './developers-editor.component.html',
  styleUrls: ['./developers-editor.component.scss']
})
export class DevelopersEditorComponent implements OnInit {

  developers: DeveloperInterface[] = [];
  newDeveloperForm: FormGroup;

  constructor(
    private developersService: DevelopersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.loadDevelopers();
    this.initNewDeveloperForm();

  }

  initNewDeveloperForm() {

    this.newDeveloperForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/^[\w\s\-\.]+$/)
      ]],
    });

  }

  loadDevelopers() {

    this.developersService.getAllDevelopers()
      .subscribe(developers => this.developers = developers);

  }

  createDeveloper() {

    let name = this.newDeveloperForm.get('name').value;

    this.developersService
      .createDeveloper(name)
      .subscribe(_ => {
        this.loadDevelopers();
        this.newDeveloperForm.get('name').reset();
      });

  }

  deleteDeveloper(id: number) {

    this.developersService
      .deleteDeveloper(id)
      .subscribe(_ => this.loadDevelopers());

  }

  get formName() { return this.newDeveloperForm.get('name'); }

}

