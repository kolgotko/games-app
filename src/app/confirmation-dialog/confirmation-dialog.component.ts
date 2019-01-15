import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() showing = false;
  @Input() message = 'Are you sure?';
  @Output() yes: EventEmitter<any> = new EventEmitter;
  @Output() no: EventEmitter<any> = new EventEmitter;

  constructor() { }

  show() { this.showing = true; }

  hide() { this.showing = false; }

  toggle() { this.showing = this.showing ? false : true; }

  ngOnInit() {
  }

}
