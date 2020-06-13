import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { CosmosSDKService } from '@model/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchValue$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cosmosSDK: CosmosSDKService,
  ) {
    this.searchValue$ = this.router.events.pipe(
      filter(
        (event): event is ActivationEnd =>
          event instanceof ActivationEnd &&
          Object.keys(event.snapshot.params).length > 0,
      ),
      map((event) => {
        if ('address' in event.snapshot.params) {
          return `accounts/${event.snapshot.params.address}`;
        } else if ('tx_hash' in event.snapshot.params) {
          return `txs/${event.snapshot.params.tx_hash}`;
        }
        return '';
      }),
    );
  }

  onSubmitSDK($event: { url: string; chainID: string }) {
    this.cosmosSDK.update($event.url, $event.chainID);
  }

  onSubmitSearchValue(data: [string, string]) {
    return this.router.navigate(data);
  }
}
