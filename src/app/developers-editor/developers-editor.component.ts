import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';

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

  async ngOnInit() {

    this.initNewDeveloperForm();
    await this.loadDevelopers();

  }

  initNewDeveloperForm() {

    this.newDeveloperForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
    });

  }

  async loadDevelopers() {

    this.developers = await this.developersService
      .getAllDevelopers()
      .toPromise();

  }

  async createDeveloper() {

    let name = this.newDeveloperForm.get('name').value;

    let data = {
      developerId: 0,
      name,
    };

    await this.developersService
      .createDeveloper(data)
      .toPromise();

    await this.loadDevelopers();
    this.newDeveloperForm.reset();

    new Noty({
      text: `developer ${name} created!`,
      type: 'success',
    })
      .show();

  }

  async deleteDeveloper(id: number) {

    await this.developersService
      .deleteDeveloper(id)
      .toPromise();

    await this.loadDevelopers();

    new Noty({
      text: 'developer deleted!',
      type: 'success',
    })
      .show();

  }

  isInvalidFormControl(control: FormControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get newDeveloperFormName() { return this.newDeveloperForm.get('name'); }

}

