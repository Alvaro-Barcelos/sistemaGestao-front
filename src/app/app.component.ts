import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clickbeleza';
}
