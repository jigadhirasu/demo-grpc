import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, map, Observable, take, tap, toArray } from 'rxjs';
import { ProductServiceClient } from 'src/assets/jspb/Product.serviceServiceClientPb';
import { Product } from 'src/assets/jspb/product_pb';
import { waitFor } from '../wait-for';

declare const Zone: any;

@Component({
  selector: 'app-z',
  templateUrl: './z.component.html',
  styleUrls: ['./z.component.scss'],
})
export class ZComponent implements OnInit {
  service = new ProductServiceClient('http://localhost:9090');
  number = 0;
  xx: Product[] = [];
  gg: Product[] = [];
  constructor() {
    const q = this.list();
    waitFor(q);


    const z = this.interview()
    waitFor(z);
    z.subscribe(g => this.gg = g);
  }

  create = () => {
    const p = new Product();
    p.setUuid('' + new Date().getTime());
    p.setName('angular create');
    from(this.service.create(p, {})).subscribe((g) =>
      console.log(g.toObject())
    );
  };

  list = (): Observable<boolean> => {
    const p = new Product();

    return from(this.service.list(p, {})).pipe(
      map(g => g.getListList()),
      tap(g => this.xx = g),
      map(() => true)
    );
  };

  get = () => {
    const p = new Product();
    p.setUuid('GGG');
    from(this.service.get(p, {})).subscribe((g) => console.log(g.toObject()));
  };

  interview = (): Observable<Product[]> => {
    const p = new Product();
    const stream = this.service.subscribe(p, {});

    return new Observable<Product>((observe) => {
      stream.on('data', (g) => {
        observe.next(g);
      });
    }).pipe(
      take(10),
      toArray(),
    );


  };

  ngOnInit(): void {
    this.list();
  }
}
