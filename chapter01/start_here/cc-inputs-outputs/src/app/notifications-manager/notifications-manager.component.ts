import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-manager',
  templateUrl: './notifications-manager.component.html',
  styleUrls: ['./notifications-manager.component.scss'],
})
export class NotificationsManagerComponent implements OnInit {
  @Input()
  public count = 0;
  @Output() countChanged = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  public addNotification(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }

  removeNotification() {
    if (this.count == 0) {
      return;
    }
    this.count--;
    this.countChanged.emit(this.count);
  }

  resetCount() {
    this.count = 0;
    this.countChanged.emit(this.count);
  }
}
