import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-notifications-manager',
  templateUrl: './notifications-manager.component.html',
  styleUrls: ['./notifications-manager.component.scss'],
})
export class NotificationsManagerComponent implements OnInit {
  notificationsCount$: Observable<number>;
  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsCount$ = this.notificationsService.count$;
  }

  private getCountValue(callback): void {
    this.notificationsCount$.pipe(first()).subscribe(callback);
  }

  public addNotification(): void {
    this.getCountValue((countVal) => {
      this.notificationsService.setCount(++countVal);
    });
  }

  public removeNotification(): void {
    this.getCountValue((countVal) => {
      if (countVal === 0) {
        return;
      }
      this.notificationsService.setCount(--countVal);
    });
  }

  public resetCount(): void {
    this.notificationsService.setCount(0);
  }
}
