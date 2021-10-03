import { Component } from '@angular/core';
import { interval, Subscription, partition, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = null;
  combinedStreamData = [
    {
      type: 'movie',
      title: 'john wick',
    },
    {
      type: 'cartoon',
      title: 'Thunder Cats',
    },
    {
      type: 'movie',
      title: 'inception',
    },
    {
      type: 'cartoon',
      title: 'Dragon Ball Z',
    },
    {
      type: 'cartoon',
      title: 'Ninja Turtles',
    },
    {
      type: 'movie',
      title: 'interstellar',
    },
  ];
  outputStreamData = [];
  movies = [];
  cartoons = [];
  public ngOnInit(): void {}

  public startStream(): void {
    const streamSource = interval(1500).pipe(
      map((input) => {
        const index = input % this.combinedStreamData.length;
        return this.combinedStreamData[index];
      })
    );
    const [moviesStream, cartoonsStream] = partition(
      streamSource,
      (item) => item.type === 'movie'
    );
    const sourceStream = merge(
      moviesStream.pipe(
        tap((movie) => {
          this.movies.push(movie.title);
        })
      ),
      cartoonsStream.pipe(
        tap((cartoon) => {
          this.cartoons.push(cartoon.title);
        })
      )
    );
    this.subscription = sourceStream.subscribe((input) => {
      this.outputStreamData.push(input);
      console.log(input);
    });
  }

  public stopStream(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }
}
