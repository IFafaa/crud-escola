import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {


  constructor(
    private _router: Router
  ){

  }

  redirectTo(route: string): void{
    this._router.navigate([route])
  }
}
