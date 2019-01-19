import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DevelopersService } from '../developers.service';
import { DeveloperInterface } from '../interfaces/developer.interface';
import * as Noty from 'noty';
import { Observable, throwError, of, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-developer-editor',
  templateUrl: './developer-editor.component.html',
  styleUrls: ['./developer-editor.component.scss']
})
export class DeveloperEditorComponent implements OnInit {

  developer: Observable<DeveloperInterface>;
  developerForm: FormGroup;
  load = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private developersService: DevelopersService,
  ) { }

  ngOnInit() {

    this.route.params.pipe(switchMap(( params ) => {

        this.developer = this.developersService.getDeveloper(params.id);
        return this.developer;

      }))
      .subscribe(developer => {

        this.developerForm = this.fb.group({
          name: [developer.name, Validators.required],
        });

        this.load = true;

      }, error => {

        new Noty({
          text: `Error load developer data. Details: ${error.message}`,
          type: 'error',
          timeout: false,
        })
          .show();

      });

  }

  saveDeveloper() {

    if (this.developerForm.invalid) { return; }

    this.developer.pipe(switchMap(developer => {

      const data = {
        developerId: developer.developerId,
        ...this.developerForm.value,
      };

      const update = this.developersService.updateDeveloper(data);
      return zip(of(developer.developerId), update);

    }))
      .pipe(switchMap(([id, _]) => {

        this.developer = this.developersService.getDeveloper(id);
        return this.developer;

      }))
      .subscribe(developer => {

        new Noty({
          text: `developer "${developer.name}" saved!`,
          type: 'success',
        })
          .show();

      }, error => {

        new Noty({
          text: `Error saving developer. Details: ${error.message}`,
          type: 'success',
          timeout: false,
        })
          .show();

      });

  }

  isInvalidFormControl(control: AbstractControl): Boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  get developerFormName() { return this.developerForm.get('name'); }

}
