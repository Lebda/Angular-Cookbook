import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public notificationsCount = 10;

  public updateNotificationsCount(count: number): void {
    this.notificationsCount = count;
  }
}
