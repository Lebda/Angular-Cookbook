import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private count: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  public count$: Observable<number> = this.count.asObservable();

  public constructor() {}

  public setCount(countVal: number): void {
    this.count.next(countVal);
  }
}
