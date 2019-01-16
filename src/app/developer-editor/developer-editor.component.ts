import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-developer-editor',
  templateUrl: './developer-editor.component.html',
  styleUrls: ['./developer-editor.component.scss']
})
export class DeveloperEditorComponent implements OnInit {

  developerId = 0;
  developer: DeveloperInterface;
  developerForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private developersService: DevelopersService,
  ) { }

  async ngOnInit() {

    this.developerId = this.route.snapshot.params.id;
    this.initForm();
    await this.loadDeveloper();
    this.patchDeveloperForm();
    this.load = true;

  }

  initForm() {

    this.developerForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
    });

  }

  async loadDeveloper() {

    try {

      this.developer = await this.developersService
        .getDeveloper(this.developerId)
        .toPromise();

    } catch (error) {

      new Noty({
        text: `Error load developer data. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  patchDeveloperForm() {

    this.developerForm
      .patchValue(this.developer);

  }

  async saveDeveloper() {

    if (this.developerForm.invalid) {
      return;
    }

    const data = {
      developerId: this.developerId,
      ...this.developerForm.value,
    };

    try {

      await this.developersService
        .updateDeveloper(data)
        .toPromise();

      await this.loadDeveloper();

      new Noty({
        text: `developer "${data.name}" saved!`,
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error saving developer. Details: ${error.message}`,
        type: 'success',
        timeout: false,
      })
        .show();

    }

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get developerFormName() { return this.developerForm.get('name'); }

}
