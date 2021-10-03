import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map, merge } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  inputStreamData = ['john wick', 'inception', 'interstellar'];
  outputStreamData = [];
  cartoonsStreamData = ['thunder cats', 'Dragon Ball Z', 'Ninja Turtles'];

  public ngOnInit(): void {}

  public startStream(): void {
    const cartoonStreamSource = interval(1000).pipe(
      map((output) => output % this.cartoonsStreamData.length),
      map((index) => this.cartoonsStreamData[index])
    );

    const streamSource = interval(1000).pipe(
      map((output) => output % this.inputStreamData.length),
      map((index) => this.inputStreamData[index]),
      merge(cartoonStreamSource)
    );
    this.subscription = streamSource.subscribe((input) => {
      this.outputStreamData.push(input);
    });
  }

  public stopStream(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
