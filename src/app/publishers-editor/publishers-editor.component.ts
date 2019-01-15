import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publishersService: PublishersService,
  ) { }

  async ngOnInit() {

    this.initForm();
    await this.loadPublishers();

  }

  initForm() {

    this.newPublisherForm = this.fb.group({
      name: ['', Validators.required],
    });

  }

  async loadPublishers() {

    this.publishers = await this.publishersService
      .getAllPublishers()
      .toPromise();

  }

  async deletePublisher(id: number) {

    await this.publishersService
      .deletePublisher(id)
      .toPromise();

    await this.loadPublishers();

    new Noty({
      text: `publisher deleted!`,
      type: 'success',
    })
      .show();

  }

  async createPublisher() {

    let data = {
      publisherId: 0,
      ...this.newPublisherForm.value,
    } as PublisherInterface;

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

  }

  isInvalidFormControl(control: FormControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get newPublisherFormName() {
    return this.newPublisherForm.get('name') as FormControl;
  }

}

