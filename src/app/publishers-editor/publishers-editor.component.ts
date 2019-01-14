import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublishersService } from '../publishers.service';
import { PublisherInterface } from '../interfaces/publisher.interface';

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

  ngOnInit() {

    this.loadPublishers();
    this.initForm();

  }

  initForm() {

    this.newPublisherForm = this.fb.group({
      name: [''],
    });

  }

  loadPublishers() {

    this.publishersService.getAllPublishers()
      .subscribe(data => {
        this.publishers = data;
      });

  }

  deletePublisher(id: number) {

    this.publishersService.deletePublisher(id)
      .subscribe(_ => {

        this.loadPublishers();

      });

  }

  createPublisher() {

    let data = {
      publisherId: 0,
      name: this.formName.value,
    } as PublisherInterface;

    this.publishersService.createPublisher(data)
      .subscribe(_ => {

        this.loadPublishers();
        this.newPublisherForm.reset();

      });

  }

  get formName() { return this.newPublisherForm.get('name'); }

}

