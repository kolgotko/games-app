import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-developer-editor',
  templateUrl: './developer-editor.component.html',
  styleUrls: ['./developer-editor.component.scss']
})
export class DeveloperEditorComponent implements OnInit {

  private developerId: number = 0;
  private developer: DeveloperInterface;
  private developerForm: FormGroup;

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

  }

  initForm() {

    this.developerForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
    })

  }

  async loadDeveloper() {

    this.developer = await this.developersService
      .getDeveloper(this.developerId)
      .toPromise();

  }

  patchDeveloperForm() {

    this.developerForm
      .patchValue(this.developer);

  }

  async saveDeveloper() {

    let data = {
      developerId: this.developerId,
      ...this.developerForm.value,
    };

    await this.developersService
      .updateDeveloper(data)
      .toPromise();

    await this.loadDeveloper();

    new Noty({
      text: `developer "${data.name}" saved!`,
      type: 'success',
    })
      .show();

  }

  isInvalidFormControl(control: FormControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get developerFormName() { return this.developerForm.get('name'); }

}
