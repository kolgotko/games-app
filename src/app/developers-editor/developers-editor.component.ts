import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormBuilder, FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-developers-editor',
  templateUrl: './developers-editor.component.html',
  styleUrls: ['./developers-editor.component.scss']
})
export class DevelopersEditorComponent implements OnInit {

  developers: DeveloperInterface[];
  newDeveloperForm: FormGroup;
  load = false;

  constructor(
    private developersService: DevelopersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {


    this.initNewDeveloperForm();
    this.developersService.getAllDevelopers()
      .subscribe(developers => {

        this.developers = developers;
        this.load = true;

      }, error => {

        new Noty({
          text: `Error load developers. Details: ${error.message}`,
          type: 'error',
          timeout: false,
        })
          .show();

      });

  }

  initNewDeveloperForm() {

    this.newDeveloperForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
    });

  }

  createDeveloper() {

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

    this.developersService.createDeveloper(data)
      .pipe(switchMap(_ => this.developersService.getAllDevelopers()))
      .subscribe(developers => {

        this.developers = developers;
        this.newDeveloperForm.reset();

        new Noty({
          text: `developer ${name} created!`,
          type: 'success',
        })
          .show();

      }, error => {

        new Noty({
          text: `Error create developer. Details: ${error.message}`,
          type: 'success',
          timeout: false,
        })
          .show();

      });

  }

  deleteDeveloper(id: number) {

    this.developersService.deleteDeveloper(id)
      .pipe(switchMap(_ => this.developersService.getAllDevelopers()))
      .subscribe(developers => {

        this.developers = developers;
        new Noty({
          text: 'developer deleted!',
          type: 'success',
        })
          .show();

      }, error => {

        new Noty({
          text: `Error deleteing developer. Details: ${error.message}!`,
          type: 'error',
          timeout: false,
        })
          .show();

      });

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get newDeveloperFormName() { return this.newDeveloperForm.get('name'); }

}

