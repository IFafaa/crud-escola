import { Component, Input } from '@angular/core';

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
}
