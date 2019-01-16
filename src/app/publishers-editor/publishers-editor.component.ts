import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup, FormControl, AbstractControl, FormBuilder, Validators
} from '@angular/forms';
import { PublishersService } from '../publishers.service';
import { PublisherInterface } from '../interfaces/publisher.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-publishers-editor',
  templateUrl: './publishers-editor.component.html',
  styleUrls: ['./publishers-editor.component.scss']
})
export class PublishersEditorComponent implements OnInit {

  publishers: PublisherInterface[] = [];
  newPublisherForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publishersService: PublishersService,
  ) { }

  async ngOnInit() {

    this.initForm();
    await this.loadPublishers();
    this.load = true;

  }

  initForm() {

    this.newPublisherForm = this.fb.group({
      name: ['', Validators.required],
    });

  }

  async loadPublishers() {

    try {

      this.publishers = await this.publishersService
        .getAllPublishers()
        .toPromise();

    } catch (error) {

      new Noty({
        text: `Error loading publisher. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  async deletePublisher(id: number) {

    try {

      await this.publishersService
        .deletePublisher(id)
        .toPromise();

      await this.loadPublishers();

      new Noty({
        text: `publisher deleted!`,
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error delete publisher. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  async createPublisher() {

    if (this.newPublisherForm.invalid) {

      Object.values(this.newPublisherForm.controls)
        .forEach(control => control.markAsTouched());

      return;
    }

    const data = {
      publisherId: 0,
      ...this.newPublisherForm.value,
    } as PublisherInterface;

    try {

      await this.publishersService
        .createPublisher(data)
        .toPromise();

      await this.loadPublishers();
      this.newPublisherForm.reset();

      new Noty({
        text: `publisher "${data.name}" created!`,
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error create publisher. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get newPublisherFormName() {
    return this.newPublisherForm.get('name') as FormControl;
  }

}

