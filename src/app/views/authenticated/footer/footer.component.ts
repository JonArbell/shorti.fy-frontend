import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  copyrightYear: number = new Date().getFullYear();
}
