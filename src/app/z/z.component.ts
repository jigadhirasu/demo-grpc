import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, map, Observable, take, tap, toArray } from 'rxjs';
import { ProductServiceClient } from 'src/assets/jspb/Product.serviceServiceClientPb';
import { Product, Resource } from 'src/assets/jspb/product_pb';
import { waitFor } from '../wait-for';

declare const Zone: any;

@Component({
  selector: 'app-z',
  templateUrl: './z.component.html',
  styleUrls: ['./z.component.scss'],
})
export class ZComponent implements OnInit {
  @ViewChild('file') file!: ElementRef<HTMLInputElement>;

  service = new ProductServiceClient('http://localhost:8878');
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

  upload = () => {
    console.log(this.file);
    const fr = new FileReader();
    fr.onload = () => {
      console.log(fr.result);

      // const data = new Resource().setData(fr.result as string);
      // from(this.service.upload(data, {})).subscribe(g => {
      //   console.log(g.getUrl);
      // });
    }
    fr.readAsDataURL(this.file.nativeElement.files![0]);
  }

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
