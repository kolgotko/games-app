import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PublishersService } from '../publishers.service';
import { PublisherInterface } from '../interfaces/publisher.interface';
import * as Noty from 'noty';

@Component({
  selector: 'app-publisher-editor',
  templateUrl: './publisher-editor.component.html',
  styleUrls: ['./publisher-editor.component.scss']
})
export class PublisherEditorComponent implements OnInit {

  publisherId: number = 0;
  publisher: PublisherInterface;
  publisherForm: FormGroup;

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

    this.publisher = await this.publishersService
      .getPublisher(this.publisherId)
      .toPromise();

  }

  async updatePublisher() {

    let data = {
      publisherId: this.publisherId,
      ...this.publisherForm.value,
    };

    await this.publishersService
      .updatePublisher(data)
      .toPromise();

    await this.loadPublisher();

    new Noty({
      text: `publisher "${data.name}" saved!`,
      type: 'success',
    })
      .show();

  }

  isInvalidFormControl(control: FormControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get publisherFormName() {
    return this.publisherForm.get('name') as FormControl;
  }

}
