import {Component} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'psb-timepicker';

  dateTimeChange($event: DateTimeFormat): void {
  }
}
