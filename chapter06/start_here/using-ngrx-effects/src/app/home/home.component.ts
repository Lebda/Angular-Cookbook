import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { IUser } from '../core/interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { getUsers } from '../store/app.actions';
import { selectUsers } from '../store/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.store.dispatch(getUsers());
  }

  ngOnDestroy(): void {}
}
