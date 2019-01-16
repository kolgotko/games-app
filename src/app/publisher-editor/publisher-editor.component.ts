import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublishersService } from '../publishers.service';
import { PublisherInterface } from '../interfaces/publisher.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-publisher-editor',
  templateUrl: './publisher-editor.component.html',
  styleUrls: ['./publisher-editor.component.scss']
})
export class PublisherEditorComponent implements OnInit {

  publisherId = 0;
  publisher: PublisherInterface;
  publisherForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publishersService: PublishersService,
  ) { }

  async ngOnInit() {

    this.publisherId = this.route.snapshot.params.id;
    this.initForm();
    await this.loadPublisher();
    this.patchPublisherForm();
    this.load = true;

  }

  initForm() {

    this.publisherForm = this.fb.group({
      name: ['', Validators.required],
    });

  }

  patchPublisherForm() {

    this.publisherForm
      .patchValue(this.publisher);

  }

  async loadPublisher() {

    try {

      this.publisher = await this.publishersService
        .getPublisher(this.publisherId)
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

  async updatePublisher() {

    if (this.publisherForm.invalid) {
      return;
    }

    const data = {
      publisherId: this.publisherId,
      ...this.publisherForm.value,
    };

    try {

      await this.publishersService
        .updatePublisher(data)
        .toPromise();

      await this.loadPublisher();

      new Noty({
        text: `publisher "${data.name}" saved!`,
        type: 'success',
      })
        .show();

    } catch (error) {

      new Noty({
        text: `Error save publisher. Details: ${error.message}`,
        type: 'error',
        timeout: false,
      })
        .show();

    }

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get publisherFormName() {
    return this.publisherForm.get('name') as FormControl;
  }

}
