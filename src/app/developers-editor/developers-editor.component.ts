import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormBuilder, FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-developers-editor',
  templateUrl: './developers-editor.component.html',
  styleUrls: ['./developers-editor.component.scss']
})
export class DevelopersEditorComponent implements OnInit {

  developers: Observable<DeveloperInterface[]>;
  newDeveloperForm: FormGroup;
  load = false;

  constructor(
    private developersService: DevelopersService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.developers = this.developersService.getAllDevelopers();
    this.initNewDeveloperForm();
    this.load = true;

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
      .subscribe(_ => {

        this.developers = this.developersService.getAllDevelopers();
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
      .subscribe(_ => {

        this.developers = this.developersService.getAllDevelopers();
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

