import { Component } from '@angular/core';
import { from } from 'rxjs';
import { ProductServiceClient } from 'src/assets/jspb/Product.serviceServiceClientPb';
import { Product } from 'src/assets/jspb/product_pb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  service = new ProductServiceClient('https://localhost:8443');
  constructor() {}

  create = () => {
    const p = new Product();
    p.setUuid('' + new Date().getTime());
    p.setName('angular create');
    from(this.service.create(p, {})).subscribe((g) => console.log(g));
  };
}
