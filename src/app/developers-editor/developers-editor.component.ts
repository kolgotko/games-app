import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormBuilder, FormGroup, Validators, AbstractControl
} from '@angular/forms';
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
  load = false;

  constructor(
    private developersService: DevelopersService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {

    this.initNewDeveloperForm();
    await this.loadDevelopers();
    this.load = true;

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

    if (this.newDeveloperForm.invalid) {

      Object.values(this.newDeveloperForm.controls)
        .forEach(control => control.markAsTouched());

      return;
    }

    const name = this.newDeveloperForm.get('name').value;

    const data = {
      developerId: 0,
      name,
    };

    try {

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

    } catch (error) {

      new Noty({
        text: `Error create developer. Details: ${error.message}`,
        type: 'success',
        timeout: false,
      })
        .show();

    }

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

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get newDeveloperFormName() { return this.newDeveloperForm.get('name'); }

}

