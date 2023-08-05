import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
  @Input() value: string = '';
  @Input() type: 'primary' | 'secondary' | 'cancel' = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string = ''
  @Input() class: string = ''

  @Output() clickEvent: EventEmitter<null> = new EventEmitter()
}
