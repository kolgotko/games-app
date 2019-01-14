import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PublishersService } from '../publishers.service';
import { PublisherInterface } from '../interfaces/publisher.interface';

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

  ngOnInit() {

    this.publisherId = this.route.snapshot.params.id;
    this.initForm();
    this.loadPublisher();

  }

  initForm() {

    this.publisherForm = this.fb.group({
      name: [''],
    });

  }

  loadPublisher() {

    this.publishersService.getPublisher(this.publisherId)
      .subscribe(publisher => {

        this.publisher = publisher;
        this.publisherForm.patchValue({
          name: publisher.name,
        });

      })

  }

  updatePublisher() {

    let data = {
      publisherId: this.publisherId,
      ...this.publisherForm.value,
    };

    this.publishersService.updatePublisher(data)
      .subscribe(_ => {
        this.loadPublisher();
      })

  }

  get formName() { return this.publisherForm.get('name'); }

}
