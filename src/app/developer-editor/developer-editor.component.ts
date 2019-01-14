import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';

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

  ngOnInit() {

    this.developerId = this.route.snapshot.params.id;
    this.initForm();
    this.loadDeveloper();

  }

  initForm() {

    this.developerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        Validators.pattern(/^[\w\-\.\s]+$/),
      ]],
    })

  }

  loadDeveloper() {

    this.developersService.getDeveloper(this.developerId)
      .subscribe(data => {

        this.developer = data;
        this.developerForm.patchValue({
          name: data.name,
        })

      });

  }

  saveDeveloper() {

    let data = {
      developerId: this.developerId,
      ...this.developerForm.value,
    };

    this.developersService
      .updateDeveloper(data)
      .subscribe(_ => this.loadDeveloper());

  }

  get formName() { return this.developerForm.get('name'); }

}
