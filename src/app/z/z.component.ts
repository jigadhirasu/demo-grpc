import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, map, Observable, of, ReplaySubject } from 'rxjs';
import { ProductServiceClient } from 'src/assets/jspb/Product.serviceServiceClientPb';
import { Product } from 'src/assets/jspb/product_pb';

@Component({
  selector: 'app-z',
  templateUrl: './z.component.html',
  styleUrls: ['./z.component.scss'],
})
export class ZComponent implements OnInit {
  service = new ProductServiceClient('http://localhost:9090');
  number = 0;

  xx: Observable<Product[]> = of([
    new Product().setUuid('XX'),
    new Product().setUuid('ZZ'),
  ]);
  constructor() {}

  create = () => {
    const p = new Product();
    p.setUuid('' + new Date().getTime());
    p.setName('angular create');
    from(this.service.create(p, {})).subscribe((g) =>
      console.log(g.toObject())
    );
  };

  list = (): Observable<Product[]> => {
    const p = new Product();

    return from(this.service.list(p, {})).pipe(map((g) => g.getListList()));
  };

  get = () => {
    const p = new Product();
    p.setUuid('GGG');
    from(this.service.get(p, {})).subscribe((g) => console.log(g.toObject()));
  };

  interview = () => {
    const p = new Product();
    const stream = this.service.subscribe(p, {});

    const o = new Observable((observe) => {
      stream.on('data', (g) => {
        observe.next(g.toObject());
      });
    });

    o.subscribe((g) => console.log(g));
  };

  ngOnInit(): void {
    this.xx = this.list();
  }
}
