import { Component, OnInit, OnDestroy } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isComponentAlive: boolean;
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  outputStreamData = [];
  streamsOutput$: Observable<string[]>;
  constructor() {}

  public ngOnInit(): void {
    this.startStream();
  }

  public ngOnDestroy(): void {
    this.stopStream();
  }

  // public startStream(): void {
  //   this.isComponentAlive = true;
  //   const streamSource = interval(1500);
  //   const secondStreamSource = interval(3000);
  //   const fastestStreamSource = interval(500);
  //   streamSource
  //     .pipe(takeWhile(() => !!this.isComponentAlive))
  //     .subscribe((input) => {
  //       this.outputStreamData.push(input);
  //       console.log('stream output', input);
  //     });
  //   secondStreamSource
  //     .pipe(takeWhile(() => !!this.isComponentAlive))
  //     .subscribe((input) => {
  //       this.outputStreamData.push(input);
  //       console.log('second stream output', input);
  //     });
  //   fastestStreamSource
  //     .pipe(takeWhile(() => !!this.isComponentAlive))
  //     .subscribe((input) => {
  //       this.outputStreamData.push(input);
  //       console.log('fastest stream output', input);
  //     });
  // }

  public startStream(): void {
    this.isComponentAlive = true;
    const streamSource = interval(1500);
    const secondStreamSource = interval(3000);
    const fastestStreamSource = interval(500);
    this.streamsOutput$ = merge(
      streamSource,
      secondStreamSource,
      fastestStreamSource
    ).pipe(
      // takeWhile(() => !!this.isComponentAlive),
      map((index) => {
        console.log('index', index);
        this.outputStreamData = [...this.outputStreamData, index];
        return this.outputStreamData;
      })
    );
  }

  public stopStream(): void {
    // thist.isComponentAlive = false;
  }
}
